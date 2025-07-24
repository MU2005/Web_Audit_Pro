import { NextRequest, NextResponse } from 'next/server';
import { pageSpeedClient } from '../../../lib/pagespeed';
import { storageManager } from '../../../lib/storage';
import { AuditRequest, ApiResponse } from '../../../lib/types';

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    const { url, device }: AuditRequest = body;

    // Validate input
    if (!url || !device) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'Missing required fields: url and device',
      }, { status: 400 });
    }

    // Validate URL format
    try {
      new URL(url);
    } catch {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'Invalid URL format',
      }, { status: 400 });
    }

    // Validate device type
    if (!['mobile', 'desktop'].includes(device)) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'Device must be either "mobile" or "desktop"',
      }, { status: 400 });
    }

    // Check if recently audited (cache for 1 hour)
    if (storageManager.isRecentlyAudited(url, device)) {
      const recentAudits = storageManager.getRecentAudits();
      const recentAudit = recentAudits.find(audit => 
        audit.url === url && audit.device === device
      );
      
      if (recentAudit) {
        return NextResponse.json<ApiResponse>({
          success: true,
          data: {
            auditId: recentAudit.auditId,
            status: 'completed',
            message: 'Using cached result from recent audit',
          },
        });
      }
    }

    console.log(`Starting audit for: ${url} (${device})`);

    // Run PageSpeed audit
    const auditResult = await pageSpeedClient.runAudit({ url, device });

    // Save to localStorage
    storageManager.saveAuditResult(auditResult);

    console.log(`Audit completed: ${auditResult.auditId}`);

    return NextResponse.json<ApiResponse>({
      success: true,
      data: {
        auditId: auditResult.auditId,
        status: 'completed',
        result: auditResult,
      },
    });

  } catch (error) {
    console.error('Audit API error:', error);
    
    return NextResponse.json<ApiResponse>({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    // Get recent audits
    const recentAudits = storageManager.getRecentAudits(20);
    
    return NextResponse.json<ApiResponse>({
      success: true,
      data: {
        audits: recentAudits,
        count: recentAudits.length,
      },
    });
  } catch (error) {
    console.error('Get audits error:', error);
    
    return NextResponse.json<ApiResponse>({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    }, { status: 500 });
  }
} 