'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Plus,
  Search,
  UserCog,
  Mail,
  Phone,
  Edit,
  Trash2,
  Shield,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { getStaff, updateStaffMember, deleteStaffMember, StaffMember } from '@/lib/storage';

const roleConfig = {
  staff: { label: 'Staff', color: 'bg-gray-100 text-gray-600' },
  manager: { label: 'Manager', color: 'bg-ocean-100 text-ocean-600' },
  admin: { label: 'Admin', color: 'bg-gold-100 text-gold-700' },
};

export default function AdminStaffPage() {
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStaff();
  }, []);

  const loadStaff = () => {
    const data = getStaff();
    setStaff(data);
    setLoading(false);
  };

  const handleToggleActive = (id: string, currentStatus: boolean) => {
    updateStaffMember(id, { isActive: !currentStatus });
    loadStaff();
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this staff member?')) {
      deleteStaffMember(id);
      loadStaff();
    }
  };

  const filteredStaff = staff.filter((member) => {
    const searchString = `${member.firstName} ${member.lastName} ${member.email} ${member.department}`.toLowerCase();
    return searchString.includes(searchTerm.toLowerCase());
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-10 h-10 border-4 border-ocean-200 border-t-ocean-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading text-navy-500">Staff Management</h1>
          <p className="text-gray-500">Manage staff members and permissions</p>
        </div>
        <Link
          href="/admin/staff/new"
          className="inline-flex items-center gap-2 px-6 py-3 bg-ocean-500 text-white font-accent font-medium rounded-xl hover:bg-ocean-600 transition-colors"
        >
          <Plus size={20} />
          Add Staff Member
        </Link>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="relative max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search staff..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-ocean-500"
          />
        </div>
      </div>

      {/* Staff List */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {filteredStaff.length === 0 ? (
          <div className="text-center py-16">
            <UserCog size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-heading text-navy-500 mb-2">No Staff Members</h3>
            <p className="text-gray-500 mb-4">Add your first staff member</p>
            <Link
              href="/admin/staff/new"
              className="inline-flex items-center gap-2 text-ocean-500 font-accent hover:text-ocean-600"
            >
              <Plus size={16} />
              Add Staff Member
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-500 bg-gray-50">
                  <th className="px-6 py-4 font-medium">Staff Member</th>
                  <th className="px-6 py-4 font-medium">Department</th>
                  <th className="px-6 py-4 font-medium">Role</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredStaff.map((member, index) => (
                  <motion.tr
                    key={member.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className={cn(
                      'hover:bg-gray-50',
                      !member.isActive && 'bg-gray-50/50 opacity-60'
                    )}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          'w-10 h-10 rounded-full flex items-center justify-center font-medium',
                          member.role === 'admin' ? 'bg-gold-100 text-gold-700' :
                          member.role === 'manager' ? 'bg-ocean-100 text-ocean-600' :
                          'bg-gray-100 text-gray-600'
                        )}>
                          {member.firstName.charAt(0)}{member.lastName.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-navy-500">
                            {member.firstName} {member.lastName}
                          </p>
                          <p className="text-xs text-gray-400">{member.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {member.department}
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        'px-3 py-1 rounded-full text-xs font-medium',
                        roleConfig[member.role].color
                      )}>
                        <Shield size={10} className="inline mr-1" />
                        {roleConfig[member.role].label}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleToggleActive(member.id, member.isActive)}
                        className={cn(
                          'flex items-center gap-2 text-sm',
                          member.isActive ? 'text-green-600' : 'text-gray-400'
                        )}
                      >
                        {member.isActive ? <ToggleRight size={20} /> : <ToggleLeft size={20} />}
                        {member.isActive ? 'Active' : 'Inactive'}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/admin/staff/${member.id}/edit`}
                          className="p-2 text-gray-400 hover:text-ocean-500 hover:bg-ocean-50 rounded-lg transition-colors"
                        >
                          <Edit size={16} />
                        </Link>
                        <button
                          onClick={() => handleDelete(member.id)}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Stats Footer */}
      <div className="flex items-center justify-between text-sm text-gray-500">
        <p>Total: {staff.length} staff members</p>
        <p>
          {staff.filter(s => s.isActive).length} active • {staff.filter(s => !s.isActive).length} inactive
        </p>
      </div>
    </div>
  );
}

