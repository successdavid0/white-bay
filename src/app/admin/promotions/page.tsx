'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Plus,
  Tag,
  Calendar,
  Copy,
  Edit,
  Trash2,
  ToggleLeft,
  ToggleRight,
  TrendingUp
} from 'lucide-react';
import { cn, formatCurrency } from '@/lib/utils';
import { getPromotions, updatePromotion, deletePromotion, Promotion } from '@/lib/storage';

export default function AdminPromotionsPage() {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  useEffect(() => {
    loadPromotions();
  }, []);

  const loadPromotions = () => {
    const data = getPromotions();
    setPromotions(data);
    setLoading(false);
  };

  const handleToggleActive = (id: string, currentStatus: boolean) => {
    updatePromotion(id, { isActive: !currentStatus });
    loadPromotions();
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this promotion?')) {
      deletePromotion(id);
      loadPromotions();
    }
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const activePromotions = promotions.filter(p => p.isActive);
  const inactivePromotions = promotions.filter(p => !p.isActive);

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
          <h1 className="text-2xl font-heading text-navy-500">Promotions & Offers</h1>
          <p className="text-gray-500">Manage discount codes and special offers</p>
        </div>
        <Link
          href="/admin/promotions/new"
          className="inline-flex items-center gap-2 px-6 py-3 bg-ocean-500 text-white font-accent font-medium rounded-xl hover:bg-ocean-600 transition-colors"
        >
          <Plus size={20} />
          Create Promotion
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <Tag className="text-ocean-500" size={24} />
            <span className="text-3xl font-heading text-navy-500">{activePromotions.length}</span>
          </div>
          <p className="text-gray-500 text-sm">Active Promotions</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="text-green-500" size={24} />
            <span className="text-3xl font-heading text-navy-500">
              {promotions.reduce((sum, p) => sum + p.usageCount, 0)}
            </span>
          </div>
          <p className="text-gray-500 text-sm">Total Uses</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="text-purple-500" size={24} />
            <span className="text-3xl font-heading text-navy-500">{inactivePromotions.length}</span>
          </div>
          <p className="text-gray-500 text-sm">Inactive/Expired</p>
        </div>
      </div>

      {/* Promotions List */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {promotions.length === 0 ? (
          <div className="text-center py-16">
            <Tag size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-heading text-navy-500 mb-2">No Promotions</h3>
            <p className="text-gray-500 mb-4">Create your first promotion to get started</p>
            <Link
              href="/admin/promotions/new"
              className="inline-flex items-center gap-2 text-ocean-500 font-accent hover:text-ocean-600"
            >
              <Plus size={16} />
              Create Promotion
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {promotions.map((promo, index) => {
              const isExpired = new Date(promo.validUntil) < new Date();
              return (
                <motion.div
                  key={promo.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className={cn(
                    'p-6 hover:bg-gray-50 transition-colors',
                    (!promo.isActive || isExpired) && 'bg-gray-50/50 opacity-70'
                  )}
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-heading text-lg text-navy-500">{promo.name}</h3>
                        <span className="px-3 py-1 bg-gold-100 text-gold-700 text-sm font-accent rounded-full">
                          {promo.discount}
                        </span>
                        {isExpired && (
                          <span className="px-2 py-1 bg-red-100 text-red-600 text-xs rounded">Expired</span>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm mb-3">{promo.description}</p>
                      
                      <div className="flex flex-wrap items-center gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-400">Code:</span>
                          <code className="px-2 py-1 bg-gray-100 rounded font-mono text-ocean-600">
                            {promo.code}
                          </code>
                          <button
                            onClick={() => copyCode(promo.code)}
                            className={cn(
                              'p-1 rounded transition-colors',
                              copiedCode === promo.code ? 'text-green-500' : 'text-gray-400 hover:text-ocean-500'
                            )}
                          >
                            <Copy size={14} />
                          </button>
                        </div>
                        <div className="flex items-center gap-2 text-gray-500">
                          <Calendar size={14} />
                          Until {new Date(promo.validUntil).toLocaleDateString()}
                        </div>
                        <div className="text-gray-500">
                          Used: {promo.usageCount}{promo.maxUsage ? `/${promo.maxUsage}` : ''}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleToggleActive(promo.id, promo.isActive)}
                        className={cn(
                          'p-2 rounded-lg transition-colors',
                          promo.isActive
                            ? 'text-green-500 hover:bg-green-50'
                            : 'text-gray-400 hover:bg-gray-100'
                        )}
                        title={promo.isActive ? 'Deactivate' : 'Activate'}
                      >
                        {promo.isActive ? <ToggleRight size={24} /> : <ToggleLeft size={24} />}
                      </button>
                      <Link
                        href={`/admin/promotions/${promo.id}/edit`}
                        className="p-2 text-gray-400 hover:text-ocean-500 hover:bg-ocean-50 rounded-lg transition-colors"
                      >
                        <Edit size={18} />
                      </Link>
                      <button
                        onClick={() => handleDelete(promo.id)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
