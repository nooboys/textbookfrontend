import { Pagination } from 'src/app/shared/models/shared.model';

export interface PurchaseOrder {
  id: number;
  godown: string;
  region: string;
  vendor_name: string;
  vendor_address: string;
  order_year: string;
  status: string;
  po_no: string;
  po_date: string;
  target_date: string;
  po_days: string;
  Material: Material[];
}

export interface DownloadPO {
  url: string;
}

export interface PurchaseOrders {
  purchase_orders: PurchaseOrder[];
  pagination: Pagination;
}

export interface Material {
  id: number;
  po_id: number;
  standard: string;
  title: string;
  medium: string;
  net_copies: number;
  size: string;
  mode_of_printing: string;
  type_of_copies: string;
  MaterialDistribution?: MaterialDistribution[];
}

export interface MaterialDistribution {
  id: number;
  po_id: number;
  material_id: number;
  branch_id: number;
  branch: {
    id: number;
    name: string;
    address: string;
    dl_type: string;
    district_id: number;
    district_name: string;
    created_at: string;
    updated_at: string;
  };
  net_copies: number;
  delivery_status: string;
}

export interface POState {
  pagination: Pagination;
  searchTerm: string;
  poStatus: string;
}

type PO = Omit<PurchaseOrder, 'Material'>;

type POMaterial = Omit<Material, 'MaterialDistribution'>;

export interface POMaterialDistribution {
  purchaseOrder: PO;
  material: POMaterial;
  materialDistribution: MaterialDistribution[];
}

export interface MaterialDistributionDetails {
  material_delivery: {
    id: number;
    copies_per_bundle: number;
    qty_as_bundles: number;
    received_copies: number;
    balanced_copies: number;
    received_bundles: number;
    defectives_count: number;
    defective_reason: string;
    received_loose_copies: number;
    weights: number;
    material_images: string[];
    voucher_images: string;
    remarks: string;
    delivery_status: string;
    dv_qty: number;
    dv_shortage_copies: number;
    dv_date: string;
    dv_no: string;
    brv_id: number;
    material_distribution_id: number;
    voucher_image_url: string;
    material_image_url: string[];
    created_at: string;
    updated_at: string;
    deleted_at: string;
  };
  book_receipt_voucher: {
    id: number;
    brv_no: string;
    brv_date: string;
    brv_series: string;
    e_brv_no: string;
    e_brv_date: string;
    po_id: number;
    carrier: string;
    carrier_no: string;
    delivery_note_no: string;
    delivery_date: string;
    material_distribution_id: number;
    created_at: string;
    updated_at: string;
    deleted_at: string;
  };
}
