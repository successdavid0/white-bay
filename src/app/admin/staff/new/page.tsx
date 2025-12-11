'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  Building,
  Shield,
  Save
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { createStaffMember } from '@/lib/storage';

const departments = [
  'Front Desk',
  'Housekeeping',
  'Food & Beverage',
  'Spa & Wellness',
  'Activities',
  'Maintenance',
  'Security',
  'Management',
];

const roles = [
  { value: 'staff', label: 'Staff', description: 'Basic access to staff portal' },
  { value: 'manager', label: 'Manager', description: 'Can manage team members' },
  { value: 'admin', label: 'Admin', description: 'Full system access' },
];

const permissions = [
  { id: 'events', label: 'Manage Events' },
  { id: 'guests', label: 'Manage Guests' },
  { id: 'announcements', label: 'Manage Announcements' },
  { id: 'bookings', label: 'View Bookings' },
  { id: 'reports', label: 'Access Reports' },
];

export default function NewStaffPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    department: '',
    role: 'staff' as 'staff' | 'manager' | 'admin',
    permissions: ['events', 'guests'] as string[],
    isActive: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      createStaffMember(formData);
      router.push('/admin/staff');
    } catch (error) {
      console.error('Error creating staff member:', error);
      setSaving(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const togglePermission = (permId: string) => {
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permId)
        ? prev.permissions.filter(p => p !== permId)
        : [...prev.permissions, permId],
    }));
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <Link
          href="/admin/staff"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-ocean-500 transition-colors mb-4"
        >
          <ArrowLeft size={18} />
          Back to Staff
        </Link>
        <h1 className="text-2xl font-heading text-navy-500">Add Staff Member</h1>
        <p className="text-gray-500">Create a new staff account.</p>
      </div>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-sm p-6 space-y-6"
      >
        {/* Name */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-accent text-navy-500 mb-2">
              First Name *
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-ocean-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-accent text-navy-500 mb-2">
              Last Name *
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-ocean-500"
              />
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-accent text-navy-500 mb-2">
              Email *
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-ocean-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-accent text-navy-500 mb-2">
              Phone
            </label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-ocean-500"
              />
            </div>
          </div>
        </div>

        {/* Department */}
        <div>
          <label className="block text-sm font-accent text-navy-500 mb-2">
            Department *
          </label>
          <div className="relative">
            <Building className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
              className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-ocean-500 appearance-none"
            >
              <option value="">Select department</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Role */}
        <div>
          <label className="block text-sm font-accent text-navy-500 mb-2">
            Role *
          </label>
          <div className="grid grid-cols-3 gap-3">
            {roles.map((role) => (
              <button
                key={role.value}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, role: role.value as typeof prev.role }))}
                className={cn(
                  'p-4 rounded-xl border-2 transition-all text-left',
                  formData.role === role.value
                    ? 'border-ocean-500 bg-ocean-50'
                    : 'border-gray-200 hover:border-gray-300'
                )}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Shield size={16} className={formData.role === role.value ? 'text-ocean-500' : 'text-gray-400'} />
                  <p className={cn(
                    'font-accent font-medium',
                    formData.role === role.value ? 'text-ocean-600' : 'text-gray-600'
                  )}>
                    {role.label}
                  </p>
                </div>
                <p className="text-xs text-gray-500">{role.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Permissions */}
        <div>
          <label className="block text-sm font-accent text-navy-500 mb-2">
            Permissions
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {permissions.map((perm) => (
              <button
                key={perm.id}
                type="button"
                onClick={() => togglePermission(perm.id)}
                className={cn(
                  'p-3 rounded-xl border transition-all text-left text-sm',
                  formData.permissions.includes(perm.id)
                    ? 'border-ocean-500 bg-ocean-50 text-ocean-600'
                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                )}
              >
                {perm.label}
              </button>
            ))}
          </div>
        </div>

        {/* Active Toggle */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
          <div>
            <p className="font-accent text-navy-500">Account Active</p>
            <p className="text-sm text-gray-500">Allow this staff member to access the system</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-ocean-500"></div>
          </label>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-100">
          <Link
            href="/admin/staff"
            className="px-6 py-3 text-gray-500 font-accent hover:text-gray-700 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-8 py-3 bg-ocean-500 text-white font-accent font-medium rounded-xl hover:bg-ocean-600 transition-colors disabled:opacity-50"
          >
            {saving ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <Save size={18} />
                Create Staff Member
              </>
            )}
          </button>
        </div>
      </motion.form>
    </div>
  );
}

