import React from 'react';
import { Link } from 'react-router-dom';

import MainNav from '../../components/MainNav';
import Header from '../../components/Header';
import '../pages.css';

export default function NotFound(props) {
  return (
    <div className="l-fullwidth">
      <div className="l-wrapper-MainNav">
        <MainNav />
      </div>
      <Header is404={true} />
      <p>
        Maaf, halaman yang Anda tuju tidak ditemukan.
        </p>
      <p>
        Silakan kembali ke <Link to="/">halaman utama</Link>.
        </p>
    </div>
  );
}
