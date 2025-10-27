import React, { useState, useEffect } from 'react';
import { FiPhone, FiMail, FiMessageSquare, FiCheck, FiX, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { getAllInquiries, updateInquiryStatus, deleteInquiry, updateInquiry } from '../../lib/inquiries-database';
import { Inquiry, INQUIRY_STATUSES } from '../../types/inquiry';

const InquiriesManager: React.FC = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const [editingNote, setEditingNote] = useState<string | null>(null);
  const [noteText, setNoteText] = useState('');

  useEffect(() => {
    loadInquiries();
  }, []);

  const loadInquiries = async () => {
    try {
      setLoading(true);
      const data = await getAllInquiries();
      setInquiries(data);
      setError(null);
    } catch (err) {
      setError('Failed to load inquiries');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await updateInquiryStatus(id, newStatus);
      await loadInquiries();
    } catch (err) {
      alert('Failed to update status');
      console.error(err);
    }
  };

  const handleSaveNote = async (id: string) => {
    try {
      await updateInquiry(id, { admin_notes: noteText });
      setEditingNote(null);
      setNoteText('');
      await loadInquiries();
    } catch (err) {
      alert('Failed to save note');
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this inquiry?')) return;
    
    try {
      await deleteInquiry(id);
      await loadInquiries();
    } catch (err) {
      alert('Failed to delete inquiry');
      console.error(err);
    }
  };

  const startEditingNote = (inquiry: Inquiry) => {
    setEditingNote(inquiry.id);
    setNoteText(inquiry.admin_notes || '');
  };

  const filteredInquiries = filter === 'all' 
    ? inquiries 
    : inquiries.filter(inq => inq.status === filter);

  const getStatusColor = (status: string) => {
    const statusConfig = INQUIRY_STATUSES.find(s => s.value === status);
    return statusConfig?.color || 'gray';
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'whatsapp': return '💬';
      case 'phone': return '📞';
      case 'form': return '📝';
      default: return '📩';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-brand-red border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-neutral-600">Loading inquiries...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-ink-900">Customer Inquiries</h1>
        <div className="text-sm text-neutral-600">
          Total: {inquiries.length} inquiries
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      <div className="mb-6 flex gap-2 flex-wrap">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            filter === 'all' 
              ? 'bg-brand-red text-white' 
              : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
          }`}
        >
          All ({inquiries.length})
        </button>
        {INQUIRY_STATUSES.map(status => (
          <button
            key={status.value}
            onClick={() => setFilter(status.value)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filter === status.value 
                ? 'bg-brand-red text-white' 
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
            }`}
          >
            {status.label} ({inquiries.filter(i => i.status === status.value).length})
          </button>
        ))}
      </div>

      {filteredInquiries.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-neutral-200">
          <p className="text-neutral-600">No inquiries found</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredInquiries.map((inquiry) => (
            <div
              key={inquiry.id}
              className="bg-white rounded-lg border border-neutral-200 p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{getTypeIcon(inquiry.inquiry_type)}</span>
                    <h3 className="text-xl font-semibold text-ink-900">{inquiry.customer_name}</h3>
                    <span className={`px-3 py-1 bg-${getStatusColor(inquiry.status)}-100 text-${getStatusColor(inquiry.status)}-800 text-sm rounded-full`}>
                      {INQUIRY_STATUSES.find(s => s.value === inquiry.status)?.label}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-neutral-600 mb-3">
                    <div className="flex items-center gap-2">
                      <FiPhone />
                      <span>{inquiry.phone_number}</span>
                    </div>
                    {inquiry.email && (
                      <div className="flex items-center gap-2">
                        <FiMail />
                        <span>{inquiry.email}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <span className="text-neutral-500">
                        {new Date(inquiry.created_at).toLocaleString()}
                      </span>
                    </div>
                  </div>
                  {inquiry.product_interest && (
                    <div className="mb-3">
                      <span className="px-3 py-1 bg-accent-gold/20 text-ink-900 text-sm rounded-full">
                        Interested in: {inquiry.product_interest}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="mb-4 p-4 bg-neutral-50 rounded-lg">
                <div className="flex items-start gap-2">
                  <FiMessageSquare className="mt-1 text-brand-red" />
                  <p className="text-neutral-800">{inquiry.message}</p>
                </div>
              </div>

              {inquiry.admin_notes && editingNote !== inquiry.id && (
                <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="text-sm font-semibold text-blue-900 mb-1">Admin Notes:</div>
                  <p className="text-blue-800">{inquiry.admin_notes}</p>
                </div>
              )}

              {editingNote === inquiry.id && (
                <div className="mb-4">
                  <textarea
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-transparent"
                    rows={3}
                    placeholder="Add admin notes..."
                  />
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => handleSaveNote(inquiry.id)}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                    >
                      Save Note
                    </button>
                    <button
                      onClick={() => {
                        setEditingNote(null);
                        setNoteText('');
                      }}
                      className="px-4 py-2 bg-neutral-200 text-ink-900 rounded-lg hover:bg-neutral-300 transition-colors text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-3">
                <select
                  value={inquiry.status}
                  onChange={(e) => handleStatusChange(inquiry.id, e.target.value)}
                  className="px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-transparent text-sm"
                >
                  {INQUIRY_STATUSES.map(status => (
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => startEditingNote(inquiry)}
                  className="px-4 py-2 bg-neutral-100 text-neutral-700 rounded-lg hover:bg-neutral-200 transition-colors text-sm flex items-center gap-2"
                >
                  <FiEdit2 /> {inquiry.admin_notes ? 'Edit Note' : 'Add Note'}
                </button>
                <a
                  href={`tel:${inquiry.phone_number}`}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm flex items-center gap-2"
                >
                  <FiPhone /> Call
                </a>
                {inquiry.email && (
                  <a
                    href={`mailto:${inquiry.email}`}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center gap-2"
                  >
                    <FiMail /> Email
                  </a>
                )}
                <button
                  onClick={() => handleDelete(inquiry.id)}
                  className="px-4 py-2 bg-red-100 text-red-800 rounded-lg hover:bg-red-200 transition-colors text-sm flex items-center gap-2"
                >
                  <FiTrash2 /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InquiriesManager;
