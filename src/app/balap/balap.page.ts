import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-balap',
  templateUrl: './balap.page.html',
  styleUrls: ['./balap.page.scss'],
})
export class BalapPage implements OnInit {
  dataBalap: any;
  public selectedId: any;
  router: any;

  constructor(private api:ApiService, private modal:ModalController) { }

  ngOnInit() {
    this.getBalap();
  }
  home() {
    this.router.navigateByUrl('/balap');
  }
  
  getBalap(){
    this.api.tampil('tampil.php').subscribe({
      next: (res: any) => {
        console.log('sukses', res);
        this.dataBalap = res;
      },
      error: (err: any)=> {
        console.log(err);
      }
    })
  }
  modalTambah: any;
  id: any;
  namaBalapan: any;
  deskripsiBalapan: any;
  jadwal: any;
  detailLintasan: any;
  modalEdit: any;

  resetModal(){
    this.id = null;
    this.namaBalapan = '';
    this.deskripsiBalapan = '';
    this.jadwal = '';
    this.detailLintasan = '';
  }

  openModalTambah(isOpen: boolean){
    this.modalTambah = isOpen;
    this.resetModal();
    this.modalTambah = true;
    this.modalEdit = false;
  }

  cancel(){
    this.modal.dismiss();
    this.modalTambah = false;
    this.modalEdit = false;
    this.resetModal();
  }

  tambahBalap() {
    if (this.namaBalapan != '' && this.deskripsiBalapan != '') {
      let data = {
        namaBalapan: this.namaBalapan,
        deskripsiBalapan: this.deskripsiBalapan,
        jadwal: this.jadwal,
        detailLintasan: this.detailLintasan,
      }
      this.api.tambah(data, 'tambah.php')
        .subscribe({
          next: (hasil: any) => {
            this.resetModal();
            console.log('berhasil tambah balap');
            this.getBalap();
            this.modalTambah = false;
            this.modal.dismiss();
          },
          error: (err: any) => {
            console.log('gagal tambah balap');
          }
        })
    } else {
      console.log('gagal tambah balap karena masih ada data yg kosong');
    }
  }
  hapusBalap(id: any){
    this.api.hapus(id,
      'hapus.php?id=').subscribe({
        next: (res: any)=> {
          console.log('sukses', res);
          this.getBalap();
          console.log('berhasil hapus data balap');
        },
        error: (error: any) => {
          console.log('gagal');
        }
      })
  }
  ambilBalap(id: any) {
    this.api.lihat(id,
      'lihat.php?id=').subscribe({
        next: (hasil: any) => {
          console.log('sukses', hasil);
          let balap = hasil;
          this.id = balap.id;
          this.namaBalapan = balap.namaBalapan;
          this.deskripsiBalapan = balap.deskripsiBalapan;
          this.jadwal = balap.jadwal;
          this.detailLintasan = balap.detailLintasan;
        },
        error: (error: any) => {
          console.log('gagal ambil data');
        }
      })
  }

  openModalEdit(isOpen: boolean, idget: any) {
    this.modalEdit = isOpen;
    this.id = idget;
    console.log(this.id);
    this.ambilBalap(this.id);
    this.modalTambah = false;
    this.modalEdit = true;
  }

  editBalap() {
    let data = {
      id: this.id,
      namaBalapan: this.namaBalapan,
      deskripsiBalapan: this.deskripsiBalapan,
      jadwal: this.jadwal,
      detailLintasan: this.detailLintasan
    }
    this.api.edit(data, 'edit.php')
      .subscribe({
        next: (hasil: any) => {
          console.log(hasil);
          this.resetModal();
          this.getBalap();
          console.log('berhasil edit Balap');
          this.modalEdit = false;
          this.modal.dismiss();
        },
        error: (err: any) => {
          console.log('gagal edit Balap');
        }
      })
  }
  public alertButtons = [
    {
      text: 'Tidak',
      role: 'cancel',
      handler: () => {
        console.log('Tidak jadi hapus data');
      },
    },
    {
      text: 'Ya',
      role: 'confirm',
      handler: () => {
        this.hapusBalap(this.selectedId);
      },
    },
  ];

  setResult(ev: any) {
    console.log(`Dismissed with role: ${ev.detail.role}`);
    this.selectedId = null;
  }

  confirmHapus(id: any) {
    this.selectedId = id;
  }
  
}
