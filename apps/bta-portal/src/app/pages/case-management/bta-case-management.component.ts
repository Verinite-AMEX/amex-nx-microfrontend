import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AmexPageHeaderComponent, AmexBreadcrumbTrailComponent, AmexStatusBadgeComponent } from '@ui-components/ui';

interface BtaCase {
  caseId: string; subject: string; status: string;
  createdBy: string; assignedTo: string; createdDate: string; lastUpdated: string;
}

@Component({
  selector: 'app-bta-case-management',
  imports: [CommonModule, FormsModule, AmexPageHeaderComponent, AmexBreadcrumbTrailComponent, AmexStatusBadgeComponent],
  template: `
    <amex-page-header portalStyle="onls" title="BTA TMC WORKLIST"></amex-page-header>
    <amex-breadcrumb-trail
      [items]="[{id:'home',label:'Home'},{id:'bta',label:'BTA Portal'},{id:'cm',label:'Case Management'}]"
      [showBack]="true" (backClick)="goBack()">
    </amex-breadcrumb-trail>

    <div class="bta-page">

      <div *ngIf="selectedCase" class="bta-panel">
        <div class="bta-panel-hd">Case Details — {{ selectedCase.caseId }}</div>
        <div class="bta-panel-bd">
          <div class="case-detail-grid">
            <div class="case-detail-field"><span class="lbl">Case ID:</span><span>{{ selectedCase.caseId }}</span></div>
            <div class="case-detail-field"><span class="lbl">Subject:</span><span>{{ selectedCase.subject }}</span></div>
            <div class="case-detail-field"><span class="lbl">Status:</span>
              <amex-status-badge [status]="getStatus(selectedCase.status)" [label]="selectedCase.status"></amex-status-badge>
            </div>
            <div class="case-detail-field"><span class="lbl">Created By:</span><span>{{ selectedCase.createdBy }}</span></div>
            <div class="case-detail-field"><span class="lbl">Assigned To:</span><span>{{ selectedCase.assignedTo }}</span></div>
            <div class="case-detail-field"><span class="lbl">Created:</span><span>{{ selectedCase.createdDate }}</span></div>
          </div>

          <div class="comment-section">
            <label class="lbl">Add Comment: <span class="req">*</span></label>
            <textarea [(ngModel)]="comment" class="bta-textarea" rows="4"
              placeholder="Enter your comment..."
              [class.field-error]="commentSubmitted && commentError">
            </textarea>
            <span *ngIf="commentSubmitted && commentError" class="error-msg">{{ commentError }}</span>
          </div>

          <div class="bta-actions" style="margin-top:12px;">
            <button class="bta-btn bta-btn-secondary" (click)="backToList()">Back to List</button>
            <button class="bta-btn bta-btn-primary" (click)="submitComment()">Submit Comment</button>
            <button class="bta-btn bta-btn-danger"
              [disabled]="selectedCase.status === 'Closed'"
              [class.bta-btn-disabled]="selectedCase.status === 'Closed'"
              (click)="closeCase()">Close Case</button>
          </div>

          <div *ngIf="commentSuccess" class="success-msg">{{ commentSuccess }}</div>

        </div>
      </div>

      <div *ngIf="!selectedCase" class="bta-panel">
        <div class="bta-panel-hd">BTA TMC Worklist</div>
        <div class="bta-panel-bd">

          <div class="search-row">
            <label>Search Cases</label>
            <input type="text" [(ngModel)]="searchTerm" class="bta-input"
              placeholder="Enter Case ID or keyword"
              [class.field-error]="searchSubmitted && searchError"
              (keyup.enter)="search()"/>
            <button class="bta-btn bta-btn-primary" (click)="search()">Search</button>
            <button class="bta-btn bta-btn-secondary" (click)="clearSearch()">Clear</button>
          </div>

          <div *ngIf="searchSubmitted && searchError" class="error-msg" style="margin-top:6px;">
            {{ searchError }}
          </div>

          <div *ngIf="searched && filteredCases.length === 0" class="no-records">
            No cases found matching "{{ lastSearchTerm }}"
          </div>

          <table *ngIf="searched && filteredCases.length" class="bta-table" style="margin-top:14px;">
            <thead>
              <tr><th>Case ID</th><th>Subject</th><th>Status</th><th>Created By</th><th>Assigned To</th><th>Created</th><th>Last Updated</th><th></th></tr>
            </thead>
            <tbody>
              <tr *ngFor="let c of filteredCases">
                <td><a class="bta-link" (click)="viewCase(c)">{{ c.caseId }}</a></td>
                <td>{{ c.subject }}</td>
                <td><amex-status-badge [status]="getStatus(c.status)" [label]="c.status"></amex-status-badge></td>
                <td>{{ c.createdBy }}</td><td>{{ c.assignedTo }}</td>
                <td>{{ c.createdDate }}</td><td>{{ c.lastUpdated }}</td>
                <td><a class="bta-link" (click)="viewCase(c)">View</a></td>
              </tr>
            </tbody>
          </table>

          <div *ngIf="!searched" class="all-cases">
            <table class="bta-table" style="margin-top:14px;">
              <thead>
                <tr><th>Case ID</th><th>Subject</th><th>Status</th><th>Created By</th><th>Assigned To</th><th>Created</th><th>Last Updated</th><th></th></tr>
              </thead>
              <tbody>
                <tr *ngFor="let c of cases">
                  <td><a class="bta-link" (click)="viewCase(c)">{{ c.caseId }}</a></td>
                  <td>{{ c.subject }}</td>
                  <td><amex-status-badge [status]="getStatus(c.status)" [label]="c.status"></amex-status-badge></td>
                  <td>{{ c.createdBy }}</td><td>{{ c.assignedTo }}</td>
                  <td>{{ c.createdDate }}</td><td>{{ c.lastUpdated }}</td>
                  <td><a class="bta-link" (click)="viewCase(c)">View</a></td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  `,
  styles: [`
    .bta-page          { padding:0 16px 24px; background:#fff; }
    .bta-panel         { border:1px solid #b8d0e8; border-radius:2px; overflow:hidden; margin-top:12px; }
    .bta-panel-hd      { background:#cfe2f3; border-bottom:1px solid #b8d0e8; padding:8px 14px; font-size:13px; font-weight:bold; color:#1e3a6e; }
    .bta-panel-bd      { padding:16px; }
    .search-row        { display:flex; align-items:center; gap:10px; flex-wrap:wrap; }
    .search-row label  { font-size:12px; font-weight:bold; color:#333; white-space:nowrap; }
    .bta-input         { padding:4px 10px; border:1px solid #aaa; font-size:12px; font-family:Arial,sans-serif; min-width:200px; }
    .bta-textarea      { width:100%; padding:8px; font-size:12px; font-family:Arial,sans-serif; border:1px solid #aaa; resize:vertical; margin-top:6px; box-sizing:border-box; }
    .field-error       { border-color:#cc0000 !important; }
    .error-msg         { color:#cc0000; font-size:11px; display:block; margin-top:3px; }
    .success-msg       { margin-top:10px; padding:8px 12px; background:#e6f9f0; color:#1a7a4a; border:1px solid #b7e4ce; font-size:12px; border-radius:2px; }
    .req               { color:#cc0000; }
    .bta-btn           { padding:4px 14px; font-size:12px; font-family:Arial,sans-serif; cursor:pointer; border-radius:2px; }
    .bta-btn-primary    { background:#1e3a6e; color:#fff; border:1px solid #1e3a6e; }
    .bta-btn-primary:hover  { background:#2d5499; }
    .bta-btn-secondary  { background:#fff; color:#333; border:1px solid #aaa; }
    .bta-btn-danger     { background:#cc0000; color:#fff; border:1px solid #cc0000; }
    .bta-btn-disabled   { opacity:0.5; cursor:not-allowed !important; }
    .no-records        { font-size:12px; color:#cc0000; padding:12px 0; }
    .bta-table         { width:100%; border-collapse:collapse; font-size:12px; }
    .bta-table th      { background:#cfe2f3; border:1px solid #b8d0e8; padding:7px 10px; font-weight:bold; color:#1e3a6e; text-align:left; white-space:nowrap; }
    .bta-table td      { border:1px solid #dde4ed; padding:7px 10px; }
    .bta-link          { color:#006fcf; cursor:pointer; text-decoration:underline; }
    .case-detail-grid  { display:grid; grid-template-columns:1fr 1fr; gap:10px 20px; margin-bottom:16px; }
    .case-detail-field { display:flex; align-items:center; gap:10px; font-size:12px; }
    .lbl               { font-weight:bold; color:#555; min-width:100px; }
    .comment-section   { margin-top:12px; }
    .bta-actions       { display:flex; gap:10px; }
  `]
})
export class BtaCaseManagementComponent {
  selectedCase: BtaCase | null = null;
  searchTerm = '';
  lastSearchTerm = '';
  searched = false;
  searchSubmitted = false;
  searchError = '';
  comment = '';
  commentError = '';
  commentSuccess = '';
  commentSubmitted = false;

  cases: BtaCase[] = [
    { caseId:'CASE101', subject:'Transaction dispute — Emirates AUH-DXB', status:'Open',   createdBy:'BTAUSR001', assignedTo:'BTAADM001', createdDate:'10/03/2025', lastUpdated:'12/03/2025' },
    { caseId:'CASE102', subject:'Missing refund — Hilton JBR',            status:'Pending', createdBy:'BTAUSR002', assignedTo:'BTAADM001', createdDate:'05/03/2025', lastUpdated:'08/03/2025' },
    { caseId:'CASE103', subject:'Duplicate charge — Hertz rental',        status:'Closed',  createdBy:'BTAUSR001', assignedTo:'BTAADM002', createdDate:'20/02/2025', lastUpdated:'25/02/2025' },
  ];

  get filteredCases() {
    if (!this.searchTerm.trim()) return [];
    return this.cases.filter(c =>
      c.caseId.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      c.subject.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  getStatus(s: string): any {
    return ({ 'Open':'active', 'Pending':'pending', 'Closed':'completed', 'Resolved':'approved' } as any)[s] || 'inactive';
  }

  search() {
    this.searchSubmitted = true;
    this.searchError = '';

    if (!this.searchTerm.trim()) {
      this.searchError = 'Please enter a Case ID or keyword to search.';
      return;
    }

    this.lastSearchTerm = this.searchTerm.trim();
    this.searched = true;
  }

  clearSearch() {
    this.searchTerm = '';
    this.lastSearchTerm = '';
    this.searched = false;
    this.searchSubmitted = false;
    this.searchError = '';
  }

  viewCase(c: BtaCase) {
    this.selectedCase = c;
    this.resetComment();
  }

  backToList() {
    this.selectedCase = null;
    this.resetComment();
  }

  goBack() {
    this.selectedCase = null;
    this.resetComment();
  }

  resetComment() {
    this.comment = '';
    this.commentError = '';
    this.commentSuccess = '';
    this.commentSubmitted = false;
  }

  submitComment() {
    this.commentSubmitted = true;
    this.commentError = '';

    if (!this.comment.trim()) {
      this.commentError = 'Comment cannot be empty.';
      return;
    }

    if (this.comment.trim().length < 10) {
      this.commentError = 'Comment must be at least 10 characters.';
      return;
    }

    this.commentSuccess = 'Comment submitted successfully.';
    this.comment = '';
    this.commentSubmitted = false;
  }

  closeCase() {
    if (!this.selectedCase || this.selectedCase.status === 'Closed') return;

    this.selectedCase.status = 'Closed';
    this.selectedCase.lastUpdated = new Date().toLocaleDateString('en-GB');
    this.selectedCase = null;
    this.resetComment();
  }
}