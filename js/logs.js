// ============================================================
//  RUSI MOTORS V2 – Activity Logging Module
// ============================================================

import { db, auth } from './firebase-config.js';
import {
  collection, addDoc, getDocs, query,
  orderBy, limit, where, serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const LOGS_COL = 'activity_logs';

export async function logActivity(module, action, userId = null) {
  try {
    const user = auth.currentUser;
    await addDoc(collection(db, LOGS_COL), {
      module, action,
      userId:    userId || user?.uid || 'system',
      userEmail: user?.email || 'system',
      timestamp: serverTimestamp(),
      browser:   navigator.userAgent.substring(0, 80)
    });
  } catch (err) { console.warn('[Log]', err.message); }
}

export async function fetchLogs({ maxCount = 300, module = null } = {}) {
  try {
    let q = query(collection(db, LOGS_COL), orderBy('timestamp', 'desc'), limit(maxCount));
    if (module) q = query(collection(db, LOGS_COL), where('module','==',module), orderBy('timestamp','desc'), limit(maxCount));
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch (err) { console.error('[Log]', err); return []; }
}

export function formatLogTime(ts) {
  if (!ts) return '—';
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  return d.toLocaleString('en-PH', { year:'numeric', month:'short', day:'2-digit', hour:'2-digit', minute:'2-digit', second:'2-digit', hour12:true });
}

export function getModuleBadge(module) {
  const map = {
    AUTH:      { cls: 'badge-info',    icon: '🔑' },
    INVENTORY: { cls: 'badge-red',     icon: '🏍️' },
    SALES:     { cls: 'badge-warning', icon: '💰' },
    SERVICES:  { cls: 'badge-success', icon: '🔧' },
    CUSTOMERS: { cls: 'badge-info',    icon: '👤' },
    MESSAGES:  { cls: 'badge-muted',   icon: '💬' },
    SETTINGS:  { cls: 'badge-muted',   icon: '⚙️'  },
    SYSTEM:    { cls: 'badge-muted',   icon: '🖥️'  }
  };
  return map[module] || { cls: 'badge-muted', icon: '📝' };
}
