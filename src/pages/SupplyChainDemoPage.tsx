import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

const shipments = [
  { id: 'PO-2301', route: 'Semarang -> Jakarta', status: 'In Transit', eta: '6 jam', stock: 'Aman' },
  { id: 'PO-2302', route: 'Bandung -> Surabaya', status: 'Delayed', eta: '14 jam', stock: 'Perlu Restock' },
  { id: 'PO-2303', route: 'Medan -> Semarang', status: 'Delivered', eta: 'Selesai', stock: 'Aman' },
];

const SupplyChainDemoPage = () => {
  return (
    <div className="min-h-screen bg-[var(--app-bg)] pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-8">
          <Link to="/laboratory" className="inline-flex items-center gap-2 rounded-xl border border-[var(--app-border)] px-4 py-2 text-sm font-bold text-[var(--app-text)] hover:bg-[var(--app-surface)]">
            <ArrowLeft size={16} />
            Kembali ke Lab
          </Link>
        </div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-[var(--app-text)]">Supply Chain Management Demo</h1>
          <p className="mt-4 max-w-3xl text-[var(--app-muted)] font-bold">
            Mockup dashboard untuk memantau stok, pengiriman, dan risiko operasional secara real-time.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="mt-8 overflow-hidden rounded-3xl border border-[var(--app-border)]">
          <img
            src="/assets/scm/hero.jpg"
            alt="Supply chain operations control room"
            className="h-[240px] w-full object-cover md:h-[340px]"
          />
        </motion.div>

        <div className="mt-10 grid gap-6 md:grid-cols-4">
          <div className="card-premium">
            <img src="/assets/scm/warehouse.jpg" alt="Warehouse shelves" className="h-24 w-full rounded-2xl object-cover" />
            <div className="mt-3 flex items-center gap-2 text-blue-primary"><span className="text-xs font-black uppercase">Warehouse</span></div>
            <p className="mt-4 text-3xl font-black text-[var(--app-text)]">12</p>
            <p className="text-sm font-bold text-[var(--app-muted)]">Gudang aktif</p>
          </div>
          <div className="card-premium">
            <img src="/assets/scm/delivery.jpg" alt="Delivery truck logistics" className="h-24 w-full rounded-2xl object-cover" />
            <div className="mt-3 flex items-center gap-2 text-blue-primary"><span className="text-xs font-black uppercase">Delivery</span></div>
            <p className="mt-4 text-3xl font-black text-[var(--app-text)]">38</p>
            <p className="text-sm font-bold text-[var(--app-muted)]">Pengiriman berjalan</p>
          </div>
          <div className="card-premium">
            <img src="/assets/scm/inventory.jpg" alt="Inventory tracking" className="h-24 w-full rounded-2xl object-cover" />
            <div className="mt-3 flex items-center gap-2 text-blue-primary"><span className="text-xs font-black uppercase">SKU</span></div>
            <p className="mt-4 text-3xl font-black text-[var(--app-text)]">1,248</p>
            <p className="text-sm font-bold text-[var(--app-muted)]">Produk termonitor</p>
          </div>
          <div className="card-premium">
            <img src="/assets/scm/risk.jpg" alt="Supply chain risk planning" className="h-24 w-full rounded-2xl object-cover" />
            <div className="mt-3 flex items-center gap-2 text-amber-primary"><span className="text-xs font-black uppercase">Risk</span></div>
            <p className="mt-4 text-3xl font-black text-[var(--app-text)]">3</p>
            <p className="text-sm font-bold text-[var(--app-muted)]">Anomali perlu ditindak</p>
          </div>
        </div>

        <div className="mt-8 rounded-3xl border border-[var(--app-border)] bg-[var(--app-surface)] p-6 md:p-8">
          <h2 className="text-2xl font-black text-[var(--app-text)]">Live Shipment Table</h2>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-xs uppercase tracking-widest text-[var(--app-muted)]">
                  <th className="py-3">Order</th>
                  <th className="py-3">Route</th>
                  <th className="py-3">Status</th>
                  <th className="py-3">ETA</th>
                  <th className="py-3">Stock Impact</th>
                </tr>
              </thead>
              <tbody>
                {shipments.map((item) => (
                  <tr key={item.id} className="border-t border-[var(--app-border)] text-sm font-bold text-[var(--app-text)]">
                    <td className="py-4">{item.id}</td>
                    <td className="py-4">{item.route}</td>
                    <td className="py-4">
                      <span className={`rounded-full px-3 py-1 text-xs ${item.status === 'Delayed' ? 'bg-red-100 text-red-600' : 'bg-blue-light text-blue-primary'}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="py-4">{item.eta}</td>
                    <td className="py-4">
                      <span className="inline-flex items-center gap-1 text-[var(--app-muted)]">
                        <CheckCircle2 size={14} />
                        {item.stock}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplyChainDemoPage;
