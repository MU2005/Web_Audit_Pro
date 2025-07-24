import { NextRequest, NextResponse } from 'next/server';
import { storageManager } from '../../../../lib/storage';
import { ApiResponse } from '../../../../lib/types';

export async function GET(
  request: NextRequest,
  { params }: { params: { auditId: string } }
) {
  try {
    const { auditId } = params;

    console.log(`Looking for audit: ${auditId}`);

    if (!auditId) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'Missing audit ID',
      }, { status: 400 });
    }

    // Get audit result from storage
    const auditResult = storageManager.getAuditResult(auditId);

    console.log(`Audit result found:`, auditResult ? 'Yes' : 'No');

    if (!auditResult) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'Audit not found',
      }, { status: 404 });
    }

    return NextResponse.json<ApiResponse>({
      success: true,
      data: auditResult,
    });

  } catch (error) {
    console.error('Get audit error:', error);
    
    return NextResponse.json<ApiResponse>({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { auditId: string } }
) {
  try {
    const { auditId } = params;

    if (!auditId) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'Missing audit ID',
      }, { status: 400 });
    }

    // Get current history
    const history = storageManager.getAuditHistory();
    
    // Check if audit exists
    if (!history[auditId]) {
      return NextResponse.json<ApiResponse>({
        success: false,
        error: 'Audit not found',
      }, { status: 404 });
    }

    // Remove audit from history
    delete history[auditId];
    
    // Save updated history
    localStorage.setItem('webaudit_history', JSON.stringify(history));

    return NextResponse.json<ApiResponse>({
      success: true,
      message: 'Audit deleted successfully',
    });

  } catch (error) {
    console.error('Delete audit error:', error);
    
    return NextResponse.json<ApiResponse>({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    }, { status: 500 });
  }
} 