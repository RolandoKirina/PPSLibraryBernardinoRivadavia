import { useState, useEffect } from 'react';
import Btn from '../../common/btn/Btn';
import SaveIcon from '../../../assets/img/save-icon.svg';
import './TableInfo.css';
import { useAuth } from '../../../auth/AuthContext';

export default function TableInfo({ text }) {
    if (!text) return null;

    return (
        <div className="pay-popup-content tableinfo">
            <div className="unpaid-fees-grid">
                <div className="unpaid-fee-input">
                    <p>{text.value}</p>

                </div>
            </div>
        </div>
    );
}