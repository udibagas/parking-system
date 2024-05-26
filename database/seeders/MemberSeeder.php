<?php

namespace Database\Seeders;

use App\Models\GroupMember;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MemberSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $members = [
            ["05000280", "Nila Wulandhani Susetyo Putri, AMK", "perawat"],
            ["05000279", "Hosana Kristiana Putra", "0"],
            ["05000282", "Widyastuti, AMK", "perawat"],
            ["05000289", "Oktoria Dwi Hastuti, S.Tr.AK", "0"],
            ["05000299", "Yuwono Kristanto", "0"],
            ["05000335", "Twenty Nophia Scorpio, AMK", "perawat"],
            ["05000336", "Ika Dian Andriani, AMK", "perawat"],
            ["05000337", "Muntamah", "0"],
            ["05000338", "Karti ", "0"],
            ["05000339", "Sulastri", "0"],
            ["05000340", "Suratmi ", "0"],
            ["05000341", "Ika Karuniawati, AMK", "perawat"],
            ["05000343", "Sri Sedani, AMK", "perawat"],
            ["05000344", "Stevanus Jumani", "0"],
            ["05000345", "Widiarso Hastjarjo, S.Sos", "0"],
            ["05000346", "Dwijo Sutrisno", "0"],
            ["05000349", "Yatmi Wahyuni, A.Md.P.K", "0"],
            ["05010342", "Timotius Adhi Winoto, S.Kep., Ners", "perawat"],
            ["05010347", "Reginawati, AMK", "perawat"],
            ["05010350", "Joko Tribowo, AMK", "perawat"],
            ["05010351", "Sri Puji Hastuti", "perawat"],
            ["05010354", "Yonathan Adi Christiyanto, SE", "0"],
            ["05010355", "Diana Dwi Nuryanti, S.Tr.AK", "0"],
            ["05010356", "Wahyudi Handaya, S.Tr.AK", "0"],
            ["05010359", "Haryati", "0"],
            ["05010361", "Manik Indriastuti, AMK", "perawat"],
            ["05010366", "Yulius Primanda Adi Putra, AMK", "perawat"],
            ["05010368", "Martono, S.Kep., Ners", "perawat"],
            ["05020373", "Erlin Handayaningrum, A.Md.Keb", "perawat"],
            ["05020376", "Siti Muryani ( A )", "0"],
            ["05020378", "Yosep Heriyanto", "perawat"],
            ["05020379", "Supriyanto", "0"],
            ["05020380", "Saryoto, S.Si., M.H", "0"],
            ["05020388", "dr. Cahyo Budi Utomo", "dokter"],
            ["05020392", "Siti Muryani, AMK", "perawat"],
            ["05020394", "Ervina Dwi Lestari, AMK", "0"],
            ["05020398", "P.Nuzul Nugroho, S.Psi", "0"],
            ["05020399", "Kustina Emi Sri Rejeki ", "0"],
            ["05030333", "Endang Rubiyanti, AMK", "perawat"],
            ["05030377", "Ahmat Riyanto", "0"],
            ["05050400", "dr. Teguh Priyantono, Sp.N", "dokter"],
            ["05060389", "dr. Kristina Puji Rahayu, Sp.Rad", "dokter"],
            ["05060411", "Teguh Eko Yuniarto, S.Kom", "dokter"],
            ["05070406", "Bekti Priyo Sembodo, AMK", "perawat"],
            ["05070408", "Fajar Wulansari, AMK", "perawat"],
            ["05070413", "Ari Susanti, S.Kep., Ners", "perawat"],
            ["05070414", "Hendro Dwi Susanto, A.Md.T", "0"],
            ["05070416", "Yanis Tecgran Kurniasih, A.Md.Farm", "0"],
            ["05070419", "Maria Kristiana, A.Md.AK", "0"],
            ["05070420", "Anastasia Indri Hapsari, AMK", "perawat"],
            ["05070432", "Ester Kusumaning Pertiwi, A.Md.PerKes", "0"],
            ["05080421", "Daniel Gigih Suprayogi, SE", "0"],
            ["05080422", "Dwi Wahyu Susanti, SE., MM", "0"],
            ["05080424", "Bambang Santoso, AMK", "perawat"],
            ["05080425", "Septina Yessy Saputri, A.Md.Keb", "perawat"],
            ["05080426", "Sri Pujiyati, A.Md.Keb", "perawat"],
            ["05080428", "Ardian Fitrianto, AMK", "perawat"],
            ["05080429", "Kristianto, AMK", "perawat"],
            ["05080431", "Kisminiwati, AMK", "0"],
            ["05080456", "dr. Yuli Budi Djatmiko, Sp.B", "dokter"],
            ["05090435", "Kristi Rias Nurani, A.Md.Fis", "0"],
            ["05090437", "Kristian Agung Nugroho, A.Md", "0"],
            ["05090438", "Yuanita Resanti, S.Kom", "0"],
            ["05090439", "Yudhi Pratama, S.T", "0"],
            ["05090440", "Andika Wahyu Wijayanto, SE, Akt, MM", "0"],
            ["05090441", "Tri Prasetyo, AMK", "perawat"],
            ["05090442", "Yanuar Dovi Andrianto, AMK", "perawat"],
            ["05090443", "Ermin Linarwati, AMK", "perawat"],
            ["05090445", "Dewi Retno Wulandari, AMK", "0"],
            ["05090446", "Anggi Ratna Arfianti, S. Farm.,Apt", "0"],
            ["05090449", "Dwi Bambang Indianto, AMK", "perawat"],
            ["05090450", "dr. Suhartono, Sp. An., M.Sc", "dokter"],
            ["05090451", "Yogo Dwi Nurcahyo, SH", "0"],
            ["05090452", "Budi Sus Setiyo", "0"],
            ["05090453", "Candra Bagus Budi Susilo, AMK", "perawat"],
            ["05100436", "Ruslani", "0"],
            ["05100457", "dr. David Setiawan, M.P.H", "dokter"],
            ["05100458", "Susanti Desi Anggraeni, AMK", "perawat"],
            ["05100459", "Giovani Ratri Mulyani, A.Md.Farm", "0"],
            ["05100460", "Theresia Febryana Wahyu Kusumaningrum, A.Md.Farm", "0"],
            ["05100465", "Riana Dewi, A.Md.Rad", "0"],
            ["05100467", "Rita Astuti, AMK", "perawat"],
            ["05100468", "Seriwindi, AMK", "perawat"],
            ["05100469", "Mila Citra Antara, AMK", "perawat"],
            ["05110474", "Anugerah Novianto, A.Md.Fis", "fisioterapi"],
            ["05110478", "Ardina Susanti, AMK", "perawat"],
            ["05110479", "Erti Liyaningsih, A.Md.Keb", "perawat"],
            ["05110480", "Rinta Kusuma Wardhani, A.Md.Farm", "0"],
            ["05110482", "Catur Noor Endah, A.Md.Keb", "perawat"],
            ["05110483", "Intan Suryaningrum, A.Md.Farm", "0"],
            ["05110484", "Austine Mahardika, A.Md.Farm", "0"],
            ["05110486", "Fransisca Eny Wijayanti, AMK", "perawat"],
            ["05110487", "Ratna Ika Saputri, AMK", "perawat"],
            ["05110488", "Yosua Aji Jatmiko, S.Si", "0"],
            ["05110489", "Angga Windy Satria, S.KM", "0"],
            ["05120491", "Marya Nunggal Suwito, AMK", "perawat"],
            ["05120492", "Lisa Anjelica, AMK", "perawat"],
            ["05120496", "Christina Indah Karyaningsih, A.Md.Keb", "perawat"],
            ["05120497", "Oktavia Dwi Khristiana, A.Md.AK", "0"],
            ["05120500", "Nugera Chistiana Ramelani, A.Md.AK", "0"],
            ["05120502", "Novia Adi Kurniawan, SE", "0"],
            ["05120504", "Sri Setiyaningsih, AMK", "perawat"],
            ["05120508", "Stefanus Wisnu Broto, AMK", "perawat"],
            ["05120509", "Sintia Yunita, AMK", "perawat"],
            ["05130511", "Andrea Dwi Nur Anggryeni Kusumaningrum, AMK", "perawat"],
            ["05130512", "Agustina", "0"],
            ["05130514", "Christina Prasetyo Sari, A.Md.Farm", "0"],
            ["05130515", "Niken Cahya Agnesyana, A.Md.Kg", "perawat"],
            ["05130517", "Ika Ratna Septiani, A.Md.Farm", "0"],
            ["05130519", "Ruth Tabitasari, AMK", "perawat"],
            ["05130521", "Yohana Septilia, AMK", "perawat"],
            ["05130522", "Septianingrum, AMK", "perawat"],
            ["05130524", "Ringga Sabdo Ivandinata, AMK", "perawat"],
            ["05130525", "Ayu Wandira, AMK", "perawat"],
            ["05130526", "Dwi Putri Sinaga, AMK", "perawat"],
            ["05130527", "Sri Setiasih, A.Md", "0"],
            ["05140529", "dr. Gunawan Saputra", "dokter"],
            ["05140534", "Yustina Arlini Titisari, SE", "0"],
            ["05140536", "Dita Fitriana Damayanti, A.Md.Farm", "0"],
            ["05140537", "Ayuk Tryo Fatmala, A.Md.Farm", "0"],
            ["05140539", "Frasiska Maryana, A.Md.RMIK", "0"],
            ["05140540", "Andra Dewi Budiarti, AMK", "perawat"],
            ["05140541", "Hana Rosalita, AMK", "perawat"],
            ["05140542", "Esterlina Grace Rahma Tamba, AMK", "perawat"],
            ["05140544", "Dwi Sartika, AMK", "perawat"],
            ["05150547", "Rikwanto", "0"],
            ["05150549", "Novi Astrilia, A.Md.Keb", "perawat"],
            ["05150551", "Eunika Rika Kumalasari, AMK", "perawat"],
            ["05150552", "Bernadus Alfandinus Raga, S.ST", "0"],
            ["05150553", "Hena Pratica Ayu Rustanto, A.Md.Keb", "0"],
            ["05150554", "Lestariningsih, A.Md.Keb", "0"],
            ["05150556", "Immanuel Septa Nugraha, AMK", "perawat"],
            ["05150557", "Sarkoro Kuncoro Dewo", "0"],
            ["05150558", "Sitaweni Nugraheni, SE", "0"],
            ["05150559", "Wendi Vikarani Mayosi, A.Md.Farm", "0"],
            ["05150560", "Maria Mutia Septiana Insani, A.Md", "0"],
            ["05150562", "dr. Robert Samuel Sudirga, Sp.PD", "dokter"],
            ["05150564", "Agustina Sri Lestari, S.Si. Apt", "0"],
            ["05150566", "Egyantha Pratama, AMK", "perawat"],
            ["05150567", "Cicilia Hary Octaviani, AMK", "perawat"],
            ["05150568", "Selvi Mardiani, AMK", "perawat"],
            ["05150570", "Hanggita Yeni Ansista, AMK", "perawat"],
            ["05150571", "Sagita Dewi Utami", "0"],
            ["05160573", "Andreas Alfian Aji Prakoso, A.Md.A.K", "0"],
            ["05160575", "Risma Kusumaningrum, A.Md.Keb", "perawat"],
            ["05160577", "Betania Widya Kartikaningtyas, S.Psi", "0"],
            ["05160578", "Tri Yunies Prastyani, AMK", "perawat"],
            ["05160579", "dr. Ikke Kris Wicaksono", "dokter"],
            ["05160580", "Yulia Suryaningrum, S.I.Kom", "0"],
            ["05160581", "Sarah Wilujeng, A.Md.Kep", "0"],
            ["05160582", "Matheas Adi Septiawan", "0"],
            ["05160583", "Andre Adiatmoko", "0"],
            ["05160584", "Fransisca Michelline Tuwanakotta", "0"],
            ["05160585", "Kristina Listyaning Dwi Kartika", "0"],
            ["05160587", "Ayu Setianingsih, SE", "0"],
            ["05160588", "Putri Anindia Sari, SE", "0"],
            ["05160589", "Dian Wahyu Novitia Safitri, A.Md.Kep", "perawat"],
            ["05160590", "Sri Mawar Sihaloho, A.Md.Kep", "perawat"],
            ["05160591", "Stevani Natalia Basuki, A.Md.Kep", "perawat"],
            ["05160594", "Lina Putri Christiani, A.Md.Kep", "perawat"],
            ["05170595", "dr. Lungguk Helen Alfian Tanjung, Sp.OG, M.Kes", "dokter"],
            ["05170596", "Susi Ika Purwaningsih, A.Md.Keb", "perawat"],
            ["05170598", "Ganang Tirta Aditama, AMK", "perawat"],
            ["05170599", "Yeheskhia Juwita Alfa Yoga", "0"],
            ["05170600", "Adelia Vitari", "0"],
            ["05170601", "Scolastica Herawati, A.Md.Keb", "perawat"],
            ["05170602", "Nicho Abineno, A.Md.Fis", "0"],
            ["05170603", "Eiga Kwartano Prasodjo, S.E", "0"],
            ["05170607", "Setia Rahayu, AMK", "perawat"],
            ["05170608", "Gracelia Yossefine Anandia Gunawan, A.Md.Keb", "0"],
            ["05170609", "Ratih Saraswati, S.I.Kom", "0"],
            ["05170612", "Eunike Lydia Prameswari, S.H", "0"],
            ["05170614", "Meyana Melati Putri, AMK", "perawat"],
            ["05170615", "Desti Purwantari, S.E", "0"],
            ["05170616", "Yoce Janu Saputro, AMK", "perawat"],
            ["05170617", "Binti Shofiatun, A.Md.Kep", "perawat"],
            ["05170618", "Widiyana, AMK", "0"],
            ["05170619", "Erie Swastika, A.Md.Keb", "perawat"],
            ["05180622", "Ruth Wahyu Utaminingtyas, A.Md.Kep", "perawat"],
            ["05180623", "Dwi Puspoliani Pamungkas, A.Md.Kep", "perawat"],
            ["05180624", "Cerafica Lanya Pegi Anggradewi, A.Md.Kep", "perawat"],
            ["05180625", "Feonita Kristy Mebiana, A.Md.Kep", "perawat"],
            ["05180626", "Anetosius Ananta Yogatama, A.Md.Kep", "0"],
            ["05180628", "Abednego Yulianto, SE", "0"],
            ["05180630", "Nanang Aji Prayogo, A.Md.Kep", "perawat"],
            ["05180634", "Juliastika Puspita Sari, A.Md.Keb", "perawat"],
            ["05180635", "Dina Andriani Putri, A.Md.Keb", "perawat"],
            ["05180637", "Eka Meilinda Putri, A.Md.Keb", "perawat"],
            ["05180640", "Samuel Tri Pamungkas, A.Md.Kep", "0"],
            ["05180642", "Heti Tiyastiti, AMK", "perawat"],
            ["05180643", "Lidya Septiani Kristera, A.Md.Kep", "perawat"],
            ["05180647", "Dyan Wulan Riyani, A.Md.Kep", "perawat"],
            ["05180648", "Neofenty Sippa, A.Md. Kep", "perawat"],
            ["05180649", "Brigita Adventy Damayanti, SE", "0"],
            ["05180650", "Aga Lukmana, A.Md.Farm", "0"],
            ["05180651", "Ana Kusrina, A.Md.Kep", "perawat"],
            ["05180653", "dr. Reza Yunita Sari", "dokter"],
            ["05180654", "Piping Andriyantanto, A.Md. Kep", "perawat"],
            ["05180656", "dr. Alex Christian", "dokter"],
            ["05190657", "Kristyan Budi Setyanto, SE", "0"],
            ["05190658", "Daniel Agus Wibawanto, A.Md", "0"],
            ["05190659", "Ajeng Rahmatika, A.Md", "0"],
            ["05190660", "Kukuh Desca Putra, A.Md", "0"],
            ["05190662", "Elly Indra Christiyanti, A.Md.Keb", "perawat"],
            ["05190663", "Inri Tiara Putri Mulia, A.Md.Kep", "perawat"],
            ["05190664", "Jefa Gilda Ayutia, A.Md.Kep", "perawat"],
            ["05190665", "Chrisna Yudha Kusuma, A. Md.Kep", "perawat"],
            ["05190666", "Daniel Febri Yophida, A.Md.Kep", "perawat"],
            ["05190667", "Firnandus Sujatmiko, A.Md.Kep", "perawat"],
            ["05190668", "Gregorius Kristian Ade Nugroho, A.Md.Kes", "0"],
            ["05190669", "Juni Marjaya Gea, SM", "0"],
            ["05190670", "Artha Aulia Dinar Rosianari, A.Md.RMIK", "0"],
            ["05190671", "Dhaniel Adi Prasetyo, SS", "0"],
            ["05190672", "Jaka Susila Utama", "0"],
            ["05190673", "Rudy Midyo Prasetyawan", "0"],
            ["05190674", "Dian Wibisono", "0"],
            ["05190675", "Puryono", "0"],
            ["05190677", "Agus Prasetiyo, AMK", "perawat"],
            ["05190679", "Leo Agung Edi Susetiyo, A.Md.Kep", "perawat"],
            ["05190680", "Kanti Pospito Sari, S.Farm, Apt", "0"],
            ["05190681", "Elya Miranti, A.Md", "0"],
            ["05190682", "Milka Aryanti Rustana, A.Md.Keb", "perawat"],
            ["05190683", "Novia Maharani, A.Md.Farm", "0"],
            ["05190684", "Lugmana Bagus Prabowo, A.Md.Kep", "perawat"],
            ["05190685", "Listiyana Indriani, A.Md.Farm", "0"],
            ["05190686", "Ivana Argo Cahyani, A.Md.Keb", "perawat"],
            ["05190687", "Desy Hilda Zethira, A.Md.Kep", "perawat"],
            ["05190688", "Putri Mulia Nugrahaeni, A.Md.Kep", "perawat"],
            ["05200689", "Elisa Noviana, A.Md.Kep", "perawat"],
            ["05200690", "Yohanes Christianto, A.Md.Kep", "0"],
            ["05200692", "Yonatan Setiaji, A.Md.Kep", "0"],
            ["05200693", "Margareta Gestavia Budiyanto, A.Md.Fis", "0"],
            ["05200695", "Maleachi Diky Candra, A.Md", "0"],
            ["05200696", "Stefani Chrisyunita, A.Md.A.K", "0"],
            ["05200697", "Appolonaris Aditia, A.Md.Kep", "perawat"],
            ["05200701", "Asep Cahyono", "0"],
            ["05200702", "Septadi Setiya Utama", "0"],
            ["05200703", "Yuvens Gigih Dwi Krisanto, SE", "0"],
            ["05200704", "Alberd Geovani, A.Md.Kep", "perawat"],
            ["05200705", "Yani Krisnawati, A.Md.Kep", "perawat"],
            ["05200706", "Naftali Anica Welasih, A.Md.Keb", "perawat"],
            ["05200707", "Devi Setioningrum, SM", "0"],
            ["05200709", "dr. Mario Sadar Bernitho Hutagalung, Sp.B", "dokter"],
            ["05200710", "dr. Okki Aurillia", "dokter"],
            ["05200712", "dr. Clement Octavianus Rahardjo", "dokter"],
            ["05200716", "Natalia Prischa Thian Prameswari, A.Md.Keb", "perawat"],
            ["05200719", "Santi Imaya Putri, A.Md.Kep", "perawat"],
            ["05200720", "Titus Luny Artani, A.Md.Kep", "0"],
            ["05210721", "Dita Wahyu Kinasih, A.Md.Keb", "perawat"],
            ["05210723", "Winda Eli Puspita, A.Md.AK", "0"],
            ["05210724", "Noviane Mutiara Setyawan, A.Md.Farm", "0"],
            ["05210725", "dr. Nita Destyadi Kusuma, Sp.N", "dokter"],
            ["05210726", "Novia Maya Permata, A.Md.Keb", "perawat"],
            ["05210727", "Erma Wahyuningrum, A.Md.Kep", "perawat"],
            ["05210728", "Fifin Yulyani, A.Md.Kep", "perawat"],
            ["05210729", "Andriyan Priyambodo", "0"],
            ["05210730", "Dedi Kurniawan", "0"],
            ["05210731", "Farasita Wulan Apriyani", "0"],
            ["05210732", "Reziana Shenita Stevani", "0"],
            ["05210733", "Yoseph Agung Christianto", "0"],
            ["05210734", "Heni Puji Astuti, A.Md.Kep", "perawat"],
            ["05210735", "Mochamad Fachrul Rozi, A.Md.Kep", "perawat"],
            ["05210736", "Rimastuti Gunaning Pratiwi, A.Md.Kes", "0"],
            ["05210737", "Widi Pangestuti, A.Md.Kep", "0"],
            ["05210738", "Agma Anggiat Zefanya Sulaksana, S.Si.Teol", "0"],
            ["05210739", "George Asela Margawignya, S.I.Kom", "0"],
            ["05210740", "Nikholas Ade Kurnia Putra", "0"],
            ["05210741", "Awang Nova Darmawan, SS", "0"],
            ["05210742", "Eunike Juli Krismawardani, SE", "0"],
            ["05220744", "Inka Mutiara Kristi, A.Md.Kes", "0"],
            ["05220745", "dr. Fransiska Alisa Ariyanti Setyaningrum", "dokter"],
            ["05220746", "dr. Ignasius Hans", "dokter"],
            ["05220747", "dr. Inata Yefta Krisma Pratama", "dokter"],
            ["05220748", "Amelia Yeni Ansista, A.Md.Kep", "perawat"],
            ["05220749", "Anita, A.Md.Kep", "perawat"],
            ["05220751", "Natalia Kristin Maharani, A.Md.Kep", "perawat"],
            ["05220752", "Novia Wulandari, AMK", "perawat"],
            ["05220753", "Vita Febrina Paradista, S.Gz", "0"],
            ["05220755", "Noel Asri Rahayu, A.Md.Farm", "0"],
            ["05220756", "Septianingtias Hapsari, S.Gz", "0"],
            ["05220757", "dr. Blasius Adrian Budianto", "dokter"],
            ["05220758", "Mellia Fajar Puspa Sari Waoma, S.Farm., Apt", "0"],
            ["05220759", "Intan Wulandari, S.Tr.AK", "0"],
            ["05220760", "Bayu Perwira Aji, A.Md.Kep", "perawat"],
            ["05220761", "Putri Kusuma Wardhani, A.Md.Keb", "perawat"],
            ["05220762", "Prawesthi Arum Palupi, A.Md.Keb", "perawat"],
            ["05220763", "Indika Kristia Sakti Sihite, A.Md.Farm", "0"],
            ["05220764", "Ajeng Dayana Puspaningrum, S.Kep., Ns", "perawat"],
            ["05220765", "Mutyara Larasati, A.Md.Keb", "perawat"],
            ["05220766", "Oktavia Hendriyani, A.Md.Kep", "perawat"],
            ["05220767", "Deta Tunjung Sari, A.Md.Kep", "perawat"],
            ["05220768", "Pebrian Nur Fitri Aldi, A.Md.Kep", "perawat"],
            ["05220769", "dr. Seta Widya Nugraha, Sp.A", "dokter"],
            ["05220770", "Afriandy Sunu Firstyawan, A.Md.Kep", "perawat"],
            ["05220771", "Demby El'zeba, A.Md.Farm", "0"],
            ["05220772", "Bayu Guntur Sridadi, A.Md.Kep", "perawat"],
            ["05220773", "Bagus Dwi Wicaksono", "0"],
            ["05220774", "Teguh Safari", "0"],
            ["05220775", "Meisy Nur Laila, A.Md.Kep", "perawat"],
            ["05220776", "Rachel Philia Rosa, A.Md.Kep", "0"],
            ["05220778", "Desta Aprilia Mekar Sari, A.Md.Kep", "perawat"],
            ["05220779", "Agnes Andita Pakage, A.Md.Kep", "perawat"],
            ["05220780", "Alfa Damas Agnesius, A.Md.Kep", "0"],
            ["05220781", "Cristina Vagil Nayu Ardhani, A.Md.Kep", "perawat"],
            ["05220782", "Daniel Alfina Gunadi, A.Md.Kep", "perawat"],
            ["05220783", "Maria Widi Astari, A.Md.Kep", "perawat"],
            ["05220784", "Mega Dwi Utami, A.Md.Kep", "perawat"],
            ["05220785", "Rima Anggista, A.Md.Kep", "perawat"],
            ["05220786", "Valentinus Dwi Fridiyanto, A.Md.Kep", "perawat"],
            ["05220787", "Kristina Mahardika Yudaningtyas, A.Md.Keb", "perawat"],
            ["05220788", "Oktavina Firstu, A.Md.Kep", "perawat"],
            ["05220789", "Amabel Variska Anjani, A.Md.Kep", "perawat"],
            ["05220790", "Agus Fajar Handoyo, A.Md.Kep", "perawat"],
            ["05230791", "Ellen Ariyani, A.Md.Kep", "perawat"],
            ["05230793", "Felumina Easy Daimasari, SKM", "0"],
            ["05230794", "Dena Surya Pratama, A.Md.Kes.(Rad)", "0"],
            ["05230795", "Devi Maita Putri Wijayanti, A.Md.Kes", "0"],
            ["05230796", "Andika Cahya Christianto Putra, S.Farm", "0"],
            ["05230797", "Apriliana Agila Megayuvita, S.Kep.,Ns", "perawat"],
            ["05230798", "Ayu Hindrihati, S.Kep.,Ns", "perawat"],
            ["05230799", "Ika Sri Kenanga, A.Md.Kep", "perawat"],
            ["05230800", "Reva Imelga Igustin Teana, A.Md.Kep", "perawat"],
            ["05230801", "Yulita Putri Siswanti, S.Kep.,Ns", "perawat"],
            ["05230802", "Dwi Eviani, S.Kep., Ns", "perawat"],
            ["05230803", "Aufrida Pramita Shelani, A.Md.Farm ", "0"],
            ["05230804", "Febyana Dewi Shinta, A.Md.Farm", "0"],
            ["05230805", "Catharina Hadmasari, A.Md.Kes", "0"],
            ["05230806", "Ester Yohana Sitorus, A.Md.Keb", "perawat"],
            ["05230807", "Hanna Setya Nugraheni, SE", "0"],
            ["05230808", "Unique Saraswati, A.Md.Kep", "perawat"],
            ["05230809", "Liando Agus Yunanto, A.Md.Kep", "0"],
            ["05230812", "Defia Arthanty,Amd.Keb", "perawat"],
            ["05230813", "Marselina Setya Martani, A.Md.Kep", "perawat"],
            ["05230814", "Elisabet Novita", "0"],
            ["05230815", "Betania Intan Nurcahyani, A.Md.Kep", "perawat"],
            ["05230816", "Dita Vidya Ningtyas, A.Md.Kep", "perawat"],
            ["05230817", "AMELIA AGATHA PERMATASARI, A.Md.Kep", "perawat"],
            ["05230818", "Eka Kristiana A.Md.Kep", "perawat"],
            ["05230819", "Elshadday Evithalia, A.Md.Kep", "perawat"],
            ["05230820", "Kedvin Immanuel, A.Md.Kep", "perawat"],
            ["05230821", "Lewi Pujantoro, A.Md.Kep", "perawat"],
            ["05230822", "Meilani Dwi Wardhani, A.Md.Kep", "perawat"],
            ["05230823", "Singgih Tamariksa. A.Md.Kep", "perawat"],
            ["05230824", "Benedikta Yunita Hoba A.md.Kes", "0"],
            ["05230825", "Fransisca Lintang Avela, A.Md.Kes(Rad)", "0"],
            ["05230826", "Moudyanti Widyajingtyas Wignyo Yusuf Sontodirjo, S.kom", "penjamin"],
            ["05230827", "Stevanus rangga aji putra wibowo AMD.Kep", "perawat"],
            ["05230828", "Ns. Muhammad Taufik S.Kep", "perawat"],
            ["05230829", "VIRGIL PUTRI NOVIA PERMATA INDARTO Amd.Keb", "perawat"],
            ["05240830", "Andika Felix Saputra Juang Harefa, S.Tr.Kes", "perawat"],
            ["05240831", "drg. Rachel Amadea", "dokter"],
            ["05240832", "dr Felita Shella Irawan", "0"],
            ["05840038", "Supeni (Penny Setyowati)", "0"],
            ["05840041", "Rodhiyah, S.Kep., Ners", "0"],
            ["05850057", "Sri Rahayu Dwi Sehati, S.Kep", "0"],
            ["05860065", "Slamet Setya Oetama, A.Md.Rad", "0"],
            ["05860077", "Wachjoe Setyo Moertini, AMK", "0"],
            ["05860081", "Petrus Suyatno, S.ST", "0"],
            ["05870084", "Yustina Ari Subekti, AMK", "0"],
            ["05870087", "Ucik Tri Winarni", "0"],
            ["05880096", "Karsini", "0"],
            ["05880103", "Warsito", "0"],
            ["05880108", "Suparjo", "0"],
            ["05880109", "Yuli Triyanto", "0"],
            ["05880110", "Ida Wahyu Irawati", "0"],
            ["05880260", "Ngatino", "0"],
            ["05890113", "Heny Purwantiningrum, A.Md.Farm", "0"],
            ["05890119", "MC. Endang Sri Ariyanti, S.Gz", "0"],
            ["05890120", "Martani Betayoga, S.Kep., Ners", "perawat"],
            ["05890125", "Dwi Martini, AMK", "perawat"],
            ["05890127", "Agus Kristanto, S.Kep., Ners", "0"],
            ["05890131", "Rustani, AMK", "perawat"],
            ["05890132", "Siti Murni ", "perawat"],
            ["05890134", "Sutarja, S.Kep., Ners", "perawat"],
            ["05900146", "Gunarti, AMK", "perawat"],
            ["05900147", "Maryati, AMK", "perawat"],
            ["05900151", "Titin Sumarni, AMK", "perawat"],
            ["05900152", "Zippora Ira Widyanna, AMK", "0"],
            ["05900153", "Ch. Endang Soehartiningsih, AMK", "0"],
            ["05900234", "Indarti, AMK", "perawat"],
            ["05900235", "Sri Wahyuti, A.Md.Kep", "perawat"],
            ["05900242", "Esty Setyowati, AMK", "perawat"],
            ["05900243", "Susilowati, AMK", "perawat"],
            ["05900245", "Tri Utari", "0"],
            ["05900250", "Uminah, AMK", "perawat"],
            ["05900252", "Nur Hidayati, AMK", "perawat"],
            ["05900262", "Yuniati, AMK", "perawat"],
            ["05910154", "Supriyanti", "perawat"],
            ["05910155", "Sumesti", "0"],
            ["05910157", "Maria Supri Wiyanti", "0"],
            ["05910159", "Yoheni Dwiningsih ", "0"],
            ["05910160", "JF. Sri Mulyani", "0"],
            ["05910161", "Dwi Nuryaningsih", "0"],
            ["05910162", "Erma Trityastuti", "0"],
            ["05910163", "Sri Martiningsih, A.Md.Farm", "0"],
            ["05910169", "Tri Winarti, AMK", "perawat"],
            ["05910170", "Putri Satriyorini, A.Md.Rad", "0"],
            ["05910171", "Lilis Prihatiningsih, AMK", "perawat"],
            ["05910172", "Sri Parwati, AMK", "perawat"],
            ["05910173", "Siti Lestari, AMK", "perawat"],
            ["05910174", "Indah Winarti, AMK", "perawat"],
            ["05910175", "Erny Setyo Herawati, AMK", "perawat"],
            ["05910181", "Opkiswati, AMK", "0"],
            ["05910231", "Daryani, AMK", "perawat"],
            ["05910249", "Sumani, AMK", "perawat"],
            ["05910253", "Sri Ratnawati, AMK", "perawat"],
            ["05910254", "Sri Sulistyaningsih, AMK", "perawat"],
            ["05910263", "Suyanti", "perawat"],
            ["05930184", "Lukman Kris Kurniawan, AMK", "perawat"],
            ["05930189", "Imanuel Waoma, SE", "0"],
            ["05930206", "Dra. Ardhana Riswari, M.Th ", "0"],
            ["05930244", "Sri Widayati", "0"],
            ["05930273", "Soemini", "0"],
            ["05940194", "Sri Trisnaningsih ", "0"],
            ["05940195", "Candra Alfimaningsih", "perawat"],
            ["05940196", "Kawanti Adiani ", "0"],
            ["05940201", "Virma Supriyanti, AMK", "perawat"],
            ["05940202", "Dwi Adi Suwiani", "0"],
            ["05940203", "Dra. Feri Sovia Ersani, Apt., M.Kes", "0"],
            ["05940204", "Gatot Widada, S.Tr.Kes", "0"],
            ["05940205", "Eni Rochwati", "0"],
            ["05940251", "Parces Lilys Retnowati", "0"],
            ["05940264", "Hartini", "0"],
            ["05940275", "Retna Soelistiyowati", "0"],
            ["05940290", "Nunik Rahayu, AMK", "perawat"],
            ["05950209", "Suharningsih, AMK", "perawat"],
            ["05950276", "Maryani, AMK", "perawat"],
            ["05950295", "Dian Kurniasih, AMK", "0"],
            ["05960208", "Sri Dini Kusumaningrum, S.Kep., Ners", "perawat"],
            ["05960211", "Lasmini, AMK", "perawat"],
            ["05960212", "Yuni Christianawati Setyati", "0"],
            ["05960213", "Suwarto", "0"],
            ["05960214", "dr. Tri Siswiyati, M.Kes", "dokter"],
            ["05960219", "Dwi Retnowati", "0"],
            ["05960220", "Sri Rahayu", "0"],
            ["05960221", "Elly Hermini", "0"],
            ["05960274", "Dwi Purwanto, S.Kep., Ns", "0"],
            ["05970216", "Ester Kurnianingsih, S.Kep., Ners", "0"],
            ["05970222", "Prihatin Eli Nuswanti Ningsih", "0"],
            ["05970223", "Endang Dwi Hastuti, A.Md.Fis", "0"],
            ["05970226", "Elisabeth Diana Yuliastuti, A.Md", "0"],
            ["05970230", "Erna Triyantiningsih, S.Kep., Ners", "0"],
            ["05970256", "Naning Widyawati, AMK", "perawat"],
            ["05970265", "Desta Nugroho Harijanti, AMK", "perawat"],
            ["05970266", "Joeni Kristanti, SH, M.Kes", "0"],
            ["05970270", "Ratnasih Wiratri", "0"],
            ["05970291", "Eri Widyanti, AMK", "perawat"],
            ["05970301", "Wahyu Handayaningsih", "0"],
            ["05970327", "Ning Mujiatun, A.Md.AK", "0"],
            ["05970328", "Dewi Cahyanti, AMK", "0"],
            ["05970329", "Darpuji Setya Ningsih, AMK", "perawat"],
            ["05970330", "Kusmiyati, AMK", "perawat"],
            ["05980227", "Wiwik Kristina Dewi, A.Md.Rad", "0"],
            ["05980237", "Fitria Martiana, AMK", "perawat"],
            ["05980239", "Patricia Nanik Purwaningsih, AMK", "0"],
            ["05980261", "dr. Sunarima, M.Kes", "0"],
            ["05980296", "dr. Virginia Maria Chrisanti, MM ", "dokter"],
            ["05980297", "Sri Darwati ", "0"],
            ["05980302", "Sukimin ", "0"],
            ["05990257", "Hendrik Budi Prasetyo, AMK", "0"],
            ["05990258", "Dwi Puji Atminingtyas, AMK", "0"],
            ["05990259", "Yulia Ikka Lusi Mela, A.Md.Farm", "0"],
            ["05990272", "Martiningrum Tri Utami, AMK", "perawat"],
            ["05990285", "Agus Sus Setiyanto, S.Kep., Ns", "perawat"],
            ["05990286", "Ika Rahayuningtyas, AMK", "perawat"],
            ["05990287", "Yeni Wiji Putri Winantuningtyas, AMK", "perawat"],
            ["05990298", "Lasri Christiany", "0"],
            ["05990322", "Sulasmi (B)", "0"],
            ["90000001", "Michelle Octaviani Putri", "dokter"],
            ["90000002", "Vanessa Olivia Gunawan", "dokter"],
            ["90000003", "Novia Rahayu Lestariningrum", "dokter"],
            ["90000004", "Eaufira Mereditha Pasaribu", "dokter"],
            ["90000005", "Maulidya Chilma Nabila", "dokter"],
            ["90000006", "Irene Ayu Permata Dewi ", "dokter"],
            ["90000007", "Annelis Aulia Sari", "0"],
            ["90000008", "Fajar Nur Adha Hidayahtul Najah", "dokter"],
            ["90000009", "Woro Puspita Gati", "dokter"],
            ["90000010", "Alya Fiqi Nabila", "dokter"],
            ["90000011", "Ai Nurul Awaliah", "dokter"],
            ["90000012", "Afif Hibatullah ", "dokter"],
            ["90000013", "dr. Afiq Zakie Ilhami", "dokter"],
            ["90000014", "dr. Mochammad Habibie Dwi Putra Taufiq", "dokter"],
            ["90000015", "Farid Santya Budi", "dokter"],
            ["90000016", "Makiyatul Madania", "dokter"],
            ["90000017", "Puji Yuli Christiani Purba, drg, Sp.BM", "dokter"],
            ["90000018", "Diyan Rahmawati, dr, SpKFR", "dokter"],
            ["90000019", "Prianka Bayu Putra,dr, Sp.M", "dokter"],
            ["90000020", "Dwiantono, dr SpTHT", "dokter"]
        ];

        $groups = array_map(function ($item) {
            return $item[2];
        }, $members);

        $groups = array_unique($groups);

        DB::transaction(function () use ($members, $groups) {
            $insertedGroups = [];

            foreach ($groups as $group) {
                $nama = strtoupper($group);
                $g = GroupMember::updateOrCreate(['nama' => $nama]);
                $insertedGroups[$nama] = $g->id;
            }

            $members = array_map(function ($item) use ($insertedGroups) {
                [$nomor_kartu, $nama, $group] = $item;

                return [
                    'nama' => $nama,
                    'nomor_kartu' => $nomor_kartu,
                    'card_type' => 'RFID',
                    'status' => true,
                    'expiry_date' => '2050-12-31',
                    'balance' => 0,
                    'group_member_id' => $insertedGroups[strtoupper($group)],
                    'berbayar' => false,
                    'register_date' => date('Y-m-d'),
                ];
            }, $members);

            DB::table('members')->insert($members);
        });
    }
}