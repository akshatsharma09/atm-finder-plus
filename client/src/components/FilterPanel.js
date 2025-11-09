import React from 'react';
import { FiFilter, FiX } from 'react-icons/fi';

function FilterPanel({ filters, onFilterChange, isOpen, onToggle }) {
  const banks = ['all', 'SBI', 'HDFC', 'ICICI', 'PNB', 'Axis', 'Kotak', 'BOB', 'Canara'];
  const statuses = ['all', 'available', 'low', 'out_of_cash'];

  const handleChange = (key, value) => {
    onFilterChange({
      ...filters,
      [key]: value,
    });
  };

  return (
    <>
      <button className="filter-toggle" onClick={onToggle} title="Toggle filters">
        <FiFilter />
        Filters
      </button>

      {isOpen && (
        <div className="filter-panel">
          <div className="filter-header">
            <h3>Filters</h3>
            <button className="filter-close" onClick={onToggle}>
              <FiX />
            </button>
          </div>

          <div className="filter-group">
            <label>Status</label>
            <select
              value={filters.status || 'all'}
              onChange={(e) => handleChange('status', e.target.value)}
            >
              {statuses.map(status => (
                <option key={status} value={status}>
                  {status === 'all' ? 'All Statuses' : status.replace(/_/g, ' ')}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Bank</label>
            <select
              value={filters.bank || 'all'}
              onChange={(e) => handleChange('bank', e.target.value)}
            >
              {banks.map(bank => (
                <option key={bank} value={bank}>
                  {bank === 'all' ? 'All Banks' : bank}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Max Distance (km)</label>
            <select
              value={filters.maxDistance || ''}
              onChange={(e) => handleChange('maxDistance', e.target.value)}
            >
              <option value="">No limit</option>
              <option value="1">1 km</option>
              <option value="5">5 km</option>
              <option value="10">10 km</option>
              <option value="25">25 km</option>
              <option value="50">50 km</option>
            </select>
          </div>

          <button
            className="clear-filters"
            onClick={() => onFilterChange({ status: 'all', bank: 'all', maxDistance: '' })}
          >
            Clear All Filters
          </button>
        </div>
      )}
    </>
  );
}

export default FilterPanel;
