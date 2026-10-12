/**
 * AgriConnect AI - Core Application UI Controller
 * Manages dynamic sidebars, role-based navigation, topbars, modals, and toasts.
 */

document.addEventListener('DOMContentLoaded', () => {
  App.init();
});

const App = {
  init() {
    this.renderRoleSwitcher();
    this.setupLogoutModal();
    this.setupMobileMenu();
    this.updateNotificationBadges();
  },

  getCurrentUser() {
    return window.store ? window.store.getCurrentUser() : null;
  },

  showToast(message, type = 'success') {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    const icon = type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️';
    toast.innerHTML = `<span>${icon}</span><span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  },

  setupLogoutModal() {
    const modalHtml = `
      <div id="logout-modal" class="modal-backdrop">
        <div class="modal-dialog">
          <div class="modal-body">
            <div class="modal-icon-bubble">👋</div>
            <h3 style="font-size:1.6rem; color:var(--primary); margin-bottom:0.5rem;">Logged out successfully!</h3>
            <p style="color:var(--text-muted); margin-bottom:1.5rem;">Thank you for using AgriConnect AI. Empowering Farmers, Connecting Buyers.</p>
            <button id="logout-confirm-btn" class="btn btn-primary btn-lg" style="width:100%;">OK</button>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);

    const okBtn = document.getElementById('logout-confirm-btn');
    if (okBtn) {
      okBtn.addEventListener('click', () => {
        window.location.href = 'index.html';
      });
    }

    // Attach click listener to any logout triggers
    document.querySelectorAll('.logout-trigger').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.triggerLogout();
      });
    });
  },

  triggerLogout() {
    if (window.store) window.store.logout();
    const modal = document.getElementById('logout-modal');
    if (modal) {
      modal.classList.add('active');
    } else {
      window.location.href = 'index.html';
    }
  },

  renderRoleSwitcher() {
    // Only render once
    if (document.querySelector('.role-switcher-pill')) return;

    const user = this.getCurrentUser();
    const rolePill = document.createElement('div');
    rolePill.className = 'role-switcher-pill';
    rolePill.title = 'Quick Role Switcher for preview & testing';
    rolePill.innerHTML = `
      <span>Role:</span>
      <select id="quick-role-select">
        <option value="Farmer" ${user && user.role === 'Farmer' ? 'selected' : ''}>🌾 Farmer (Ramesh)</option>
        <option value="Buyer" ${user && user.role === 'Buyer' ? 'selected' : ''}>🛒 Buyer (Priya)</option>
        <option value="Admin" ${user && user.role === 'Admin' ? 'selected' : ''}>🛡️ Admin</option>
      </select>
    `;

    document.body.appendChild(rolePill);

    const select = document.getElementById('quick-role-select');
    select.addEventListener('change', (e) => {
      const selectedRole = e.target.value;
      if (window.store) {
        window.store.switchRole(selectedRole);
        this.showToast(`Switched active view to ${selectedRole} mode`, 'info');
        
        // Redirect to corresponding dashboard
        setTimeout(() => {
          if (selectedRole === 'Farmer') {
            window.location.href = 'farmer-dashboard.html';
          } else if (selectedRole === 'Buyer') {
            window.location.href = 'buyer-dashboard.html';
          } else if (selectedRole === 'Admin') {
            window.location.href = 'admin-dashboard.html';
          }
        }, 500);
      }
    });
  },

  updateNotificationBadges() {
    if (!window.store) return;
    const notifs = window.store.getNotifications();
    const unread = notifs.filter(n => !n.read).length;
    document.querySelectorAll('.notif-badge').forEach(badge => {
      if (unread > 0) {
        badge.textContent = unread;
        badge.style.display = 'inline-block';
      } else {
        badge.style.display = 'none';
      }
    });
  },

  setupMobileMenu() {
    const toggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.app-sidebar');
    if (toggle && sidebar) {
      toggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
      });
    }
  }
};

window.App = App;
