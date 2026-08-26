import Image from "next/image";

export default function Benefit() {
  // TODO: ganti dengan organisasi/komunitas yang pernah/sedang Anda ikuti
  // (gambar logo ada di /public/assets/partners, silakan ganti/hapus manual)
  const partners = [
    "HIMATIF",
    "KMI"
  ];

  // Ikon di bawah sudah cukup umum untuk "kenapa bekerja sama dengan saya",
  // tinggal ganti labelnya sesuai value yang ingin Anda tonjolkan
  const benefits = [
    "relasi",
    "Komunitas", 
    "ilmu",
    "Sertifikat"
  ];

  return (
    <section id="stack" className="py-16 bg-page-alt">
      {/* Organizations/Communities Section */}
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-primary font-semibold mb-2 tracking-wider">
            -- Organisasi
          </p>
          <h2 className="text-3xl font-semibold text-heading">
            Organisasi & Komunitas
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-8 max-w-4xl mx-auto">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="bg-surface-2 P-4 rounded-lg shadow hover:shadow-lg transition duration-300"
            >
              <Image
                src={`/assets/partners/${partner}.webp`}
                alt={partner}
                width={100}
                height={100}
                className="h-36 w-auto rounded-lg"
                priority={false}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Why Work With Me Section */}
      <div className="container mx-auto my-8">
        <div className="text-center mb-12">
          <p className="text-primary font-semibold mb-2 tracking-wider">
            -- Value
          </p>
          <h2 className="text-3xl font-semibold text-heading">
            Kenapa Bekerja Sama dengan Saya
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-8 max-w-4xl mx-auto">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-surface-2 p-6 rounded-lg shadow hover:shadow-lg transition duration-300 flex flex-col items-center"
            >
              <Image
                src={`/assets/benefits/${benefit}.webp`}
                alt={benefit}
                width={200}
                height={200}
                className="h-12 w-auto mb-4"
                priority={false}
              />
              <h3 className="text-heading font-medium capitalize">
                {benefit}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}