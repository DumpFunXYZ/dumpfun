'use client';

import { useState } from 'react';

import { ClusterUiModal } from './cluster-ui';
import { ClusterUiTable } from './cluster-ui';

export default function ClusterFeature() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
     
      <ClusterUiTable />
    </div>
  );
}
