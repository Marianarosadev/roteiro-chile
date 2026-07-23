import React from 'react';
import { CreditCard, CheckCircle2, AlertCircle } from 'lucide-react';

interface PaymentBadgeProps {
  paymentStatus?: string | null;
  paymentMethod?: string | null;
}

export const PaymentBadge: React.FC<PaymentBadgeProps> = React.memo(({ paymentStatus, paymentMethod }) => {
  if (!paymentStatus && !paymentMethod) return null;

  const isNotPaid = paymentStatus?.toLowerCase().includes('não pago') || paymentStatus?.toLowerCase().includes('nao pago');
  const isPaid = paymentStatus?.toLowerCase().includes('pago') && !isNotPaid;

  return (
    <div className="flex flex-wrap items-center gap-2 text-xs">
      {paymentStatus && (
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-medium border ${
            isNotPaid
              ? 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/60 dark:text-amber-200 dark:border-amber-800'
              : isPaid
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-200 dark:border-emerald-800'
              : 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'
          }`}
        >
          {isNotPaid ? (
            <AlertCircle className="w-3 h-3 text-amber-600 dark:text-amber-400" />
          ) : (
            <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
          )}
          {paymentStatus}
        </span>
      )}

      {paymentMethod && (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 dark:bg-slate-800/80 dark:text-slate-400 border border-slate-200 dark:border-slate-700/80 text-[11px]">
          <CreditCard className="w-3 h-3 text-slate-500" />
          {paymentMethod}
        </span>
      )}
    </div>
  );
});

PaymentBadge.displayName = 'PaymentBadge';
