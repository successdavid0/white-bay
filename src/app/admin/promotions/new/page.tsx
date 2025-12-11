'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Tag,
  FileText,
  Calendar,
  Hash,
  Save
} from 'lucide-react';
import { createPromotion } from '@/lib/storage';

export default function NewPromotionPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    discount: '',
    description: '',
    terms: '',
    validFrom: new Date().toISOString().split('T')[0],
    validUntil: '',
    maxUsage: '',
    isActive: true,
  });

  const generateCode = () => {
    const code = 'WB' + Math.random().toString(36).substring(2, 8).toUpperCase();
    setFormData(prev => ({ ...prev, code }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      createPromotion({
        ...formData,
        terms: formData.terms.split('\n').filter(t => t.trim()),
        maxUsage: formData.maxUsage ? parseInt(formData.maxUsage) : undefined,
        createdBy: 'Admin User',
      });
      
      router.push('/admin/promotions');
    } catch (error) {
      console.error('Error creating promotion:', error);
      setSaving(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <Link
          href="/admin/promotions"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-ocean-500 transition-colors mb-4"
        >
          <ArrowLeft size={18} />
          Back to Promotions
        </Link>
        <h1 className="text-2xl font-heading text-navy-500">Create Promotion</h1>
        <p className="text-gray-500">Set up a new discount code or offer.</p>
      </div>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-sm p-6 space-y-6"
      >
        {/* Name */}
        <div>
          <label className="block text-sm font-accent text-navy-500 mb-2">
            Promotion Name *
          </label>
          <div className="relative">
            <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="e.g., Summer Special"
              className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-ocean-500"
            />
          </div>
        </div>

        {/* Code & Discount */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-accent text-navy-500 mb-2">
              Promo Code *
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  name="code"
                  value={formData.code}
                  onChange={(e) => setFormData(prev => ({ ...prev, code: e.target.value.toUpperCase() }))}
                  required
                  placeholder="SUMMER25"
                  className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-ocean-500 uppercase font-mono"
                />
              </div>
              <button
                type="button"
                onClick={generateCode}
                className="px-4 py-3 bg-gray-100 text-gray-600 font-accent text-sm rounded-xl hover:bg-gray-200 transition-colors whitespace-nowrap"
              >
                Generate
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-accent text-navy-500 mb-2">
              Discount *
            </label>
            <input
              type="text"
              name="discount"
              value={formData.discount}
              onChange={handleChange}
              required
              placeholder="e.g., 25% OFF or $50 OFF"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-ocean-500"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-accent text-navy-500 mb-2">
            Description *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={3}
            placeholder="Describe the promotion..."
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-ocean-500 resize-none"
          />
        </div>

        {/* Terms */}
        <div>
          <label className="block text-sm font-accent text-navy-500 mb-2">
            Terms & Conditions
          </label>
          <textarea
            name="terms"
            value={formData.terms}
            onChange={handleChange}
            rows={3}
            placeholder="Enter each term on a new line..."
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-ocean-500 resize-none"
          />
          <p className="text-xs text-gray-400 mt-1">One term per line</p>
        </div>

        {/* Validity */}
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-accent text-navy-500 mb-2">
              Valid From *
            </label>
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="date"
                name="validFrom"
                value={formData.validFrom}
                onChange={handleChange}
                required
                className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-ocean-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-accent text-navy-500 mb-2">
              Valid Until *
            </label>
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="date"
                name="validUntil"
                value={formData.validUntil}
                onChange={handleChange}
                required
                min={formData.validFrom}
                className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-ocean-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-accent text-navy-500 mb-2">
              Max Usage
            </label>
            <input
              type="number"
              name="maxUsage"
              value={formData.maxUsage}
              onChange={handleChange}
              min="1"
              placeholder="Unlimited"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-ocean-500"
            />
          </div>
        </div>

        {/* Active Toggle */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
          <div>
            <p className="font-accent text-navy-500">Activate Immediately</p>
            <p className="text-sm text-gray-500">Make this promotion available now</p>
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
            href="/admin/promotions"
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
                Create Promotion
              </>
            )}
          </button>
        </div>
      </motion.form>
    </div>
  );
}

