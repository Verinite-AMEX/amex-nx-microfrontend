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
  templateUrl: './bta-case-management.component.html',
  styleUrls: ['./bta-case-management.component.css'],
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