import React, { useEffect, useState } from "react";
import state from "../utils/state";
const { dispatch, useStoreState } = state;

const Bangladesh = {
  Barisal: {
    Jhalakathi: ["Sadar", "Kathalia", "Nalchity", "Rajapur"],
    Patuakhali: [
      "Bauphal",
      "Sadar",
      "Dumki",
      "Dashmina",
      "Kalapara",
      "Mirzaganj",
      "Galachipa",
      "Rangabali",
    ],
    Pirojpur: [
      "Sadar",
      "Nazirpur",
      "Kawkhali",
      "Bhandaria",
      "Mathbaria",
      "Nesarabad",
      "Indurkani",
    ],
    Barishal: [
      "Barishalsadar",
      "Bakerganj",
      "Babuganj",
      "Wazirpur",
      "Banaripara",
      "Gournadi",
      "Agailjhara",
      "Mehendiganj",
      "Muladi",
      "Hizla",
    ],
    Bhola: [
      "Sadar",
      "Borhanuddin",
      "Charfesson",
      "Doulatkhan",
      "Monpura",
      "Tazumuddin",
      "Lalmohan",
    ],
    Barguna: ["Amtali", "Sadar", "Betagi", "Bamna", "Pathorghata", "Taltali"],
  },
  Chittagong: {
    Cumilla: [
      "Debidwar",
      "Barura",
      "Brahmanpara",
      "Chandina",
      "Chauddagram",
      "Daudkandi",
      "Homna",
      "Laksam",
      "Muradnagar",
      "Nangalkot",
      "Cumillasadar",
      "Meghna",
      "Monohargonj",
      "Sadarsouth",
      "Titas",
      "Burichang",
      "Lalmai",
    ],
    Feni: [
      "Chhagalnaiya",
      "Sadar",
      "Sonagazi",
      "Fulgazi",
      "Parshuram",
      "Daganbhuiyan",
    ],
    Brahmanbaria: [
      "Sadar",
      "Kasba",
      "Nasirnagar",
      "Sarail",
      "Ashuganj",
      "Akhaura",
      "Nabinagar",
      "Bancharampur",
      "Bijoynagar",
    ],
    Rangamati: [
      "Sadar",
      "Kaptai",
      "Kawkhali",
      "Baghaichari",
      "Barkal",
      "Langadu",
      "Rajasthali",
      "Belaichari",
      "Juraichari",
      "Naniarchar",
    ],
    Noakhali: [
      "Sadar",
      "Companiganj",
      "Begumganj",
      "Hatia",
      "Subarnachar",
      "Kabirhat",
      "Senbug",
      "Chatkhil",
      "Sonaimuri",
    ],
    Chandpur: [
      "Haimchar",
      "Kachua",
      "Shahrasti",
      "Sadar",
      "Matlabsouth",
      "Hajiganj",
      "Matlabnorth",
      "Faridgonj",
    ],
    Lakshmipur: ["Sadar", "Kamalnagar", "Raipur", "Ramgati", "Ramganj"],
    Chattogram: [
      "Rangunia",
      "Sitakunda",
      "Mirsharai",
      "Patiya",
      "Sandwip",
      "Banshkhali",
      "Boalkhali",
      "Anwara",
      "Chandanaish",
      "Satkania",
      "Lohagara",
      "Hathazari",
      "Fatikchhari",
      "Raozan",
      "Karnafuli",
    ],
    Coxsbazar: [
      "Sadar",
      "Chakaria",
      "Kutubdia",
      "Ukhiya",
      "Moheshkhali",
      "Pekua",
      "Ramu",
      "Teknaf",
    ],
    Khagrachhari: [
      "Sadar",
      "Dighinala",
      "Panchari",
      "Laxmichhari",
      "Mohalchari",
      "Manikchari",
      "Ramgarh",
      "Matiranga",
      "Guimara",
    ],
    Bandarban: [
      "Sadar",
      "Alikadam",
      "Naikhongchhari",
      "Rowangchhari",
      "Lama",
      "Ruma",
      "Thanchi",
    ],
  },
  Dhaka: {
    Narsingdi: [
      "Belabo",
      "Monohardi",
      "Narsingdisadar",
      "Palash",
      "Raipura",
      "Shibpur",
    ],
    Gazipur: ["Kaliganj", "Kaliakair", "Kapasia", "Sadar", "Sreepur"],
    Shariatpur: [
      "Sadar",
      "Naria",
      "Zajira",
      "Gosairhat",
      "Bhedarganj",
      "Damudya",
    ],
    Narayanganj: [
      "Araihazar",
      "Bandar",
      "Narayanganjsadar",
      "Rupganj",
      "Sonargaon",
    ],
    Tangail: [
      "Basail",
      "Bhuapur",
      "Delduar",
      "Ghatail",
      "Gopalpur",
      "Madhupur",
      "Mirzapur",
      "Nagarpur",
      "Sakhipur",
      "Tangailsadar",
      "Kalihati",
      "Dhanbari",
    ],
    Kishoreganj: [
      "Itna",
      "Katiadi",
      "Bhairab",
      "Tarail",
      "Hossainpur",
      "Pakundia",
      "Kuliarchar",
      "Kishoreganjsadar",
      "Karimgonj",
      "Bajitpur",
      "Austagram",
      "Mithamoin",
      "Nikli",
    ],
    Manikganj: [
      "Harirampur",
      "Saturia",
      "Sadar",
      "Gior",
      "Shibaloy",
      "Doulatpur",
      "Singiar",
    ],
    Dhaka: ["Savar", " Dhamrai", " Keraniganj", " Nawabganj", " Dohar"],
    Munshiganj: [
      " Sadar",
      " Sreenagar",
      " Sirajdikhan",
      " Louhajanj",
      " Gajaria",
      " Tongibari",
    ],
    Rajbari: [" Sadar", " Goalanda", " Pangsa", " Baliakandi", " Kalukhali"],
    Madaripur: ["Sadar", " Shibchar", " Kalkini", " Rajoir"],
    Gopalganj: [
      "Sadar",
      " Kashiani",
      " Tungipara",
      " Kotalipara",
      " Muksudpur",
    ],
    Faridpur: [
      "Sadar",
      " Alfadanga",
      " Boalmari",
      " Sadarpur",
      " Nagarkanda",
      " Bhanga",
      " Charbhadrasan",
      " Madhukhali",
      " Saltha",
    ],
  },
  Khulna: {
    Jashore: [
      "Manirampur",
      " Abhaynagar",
      " Bagherpara",
      " Chougachha",
      " Jhikargacha",
      " Keshabpur",
      " Sadar",
      " Sharsha",
    ],
    Satkhira: [
      "Assasuni",
      " Debhata",
      " Kalaroa",
      " Satkhirasadar",
      " Shyamnagar",
      " Tala",
      " Kaliganj",
    ],
    Meherpur: ["Mujibnagar", " Meherpursadar", " Gangni"],
    Narail: ["Narailsadar", " Lohagara", " Kalia"],
    Chuadanga: ["Chuadangasadar", " Alamdanga", " Damurhuda", " Jibannagar"],
    Kushtia: [
      "Kushtiasadar",
      " Kumarkhali",
      " Khoksa",
      " Mirpurkushtia",
      " Daulatpur",
      " Bheramara",
    ],
    Magura: ["Shalikha", " Sreepur", " Magurasadar", " Mohammadpur"],
    Khulna: [
      "Paikgasa",
      " Fultola",
      " Digholia",
      " Rupsha",
      " Terokhada",
      " Dumuria",
      " Botiaghata",
      " Dakop",
      " Koyra",
    ],
    Bagerhat: [
      "Fakirhat",
      " Sadar",
      " Mollahat",
      " Sarankhola",
      " Rampal",
      " Morrelganj",
      " Kachua",
      " Mongla",
      " Chitalmari",
    ],
    Jhenaidah: [
      "Sadar",
      " Shailkupa",
      " Harinakundu",
      " Kaliganj",
      " Kotchandpur",
      " Moheshpur",
    ],
  },
  Mymensingh: {
    Sherpur: [
      "Sherpursadar",
      " Nalitabari",
      " Sreebordi",
      " Nokla",
      " Jhenaigati",
    ],
    Mymensingh: [
      "Fulbaria",
      " Trishal",
      " Bhaluka",
      " Muktagacha",
      " Mymensinghsadar",
      " Dhobaura",
      " Phulpur",
      " Haluaghat",
      " Gouripur",
      " Gafargaon",
      " Iswarganj",
      " Nandail",
      " Tarakanda",
    ],
    Jamalpur: [
      "Jamalpursadar",
      " Melandah",
      " Islampur",
      " Dewangonj",
      " Sarishabari",
      " Madarganj",
      " Bokshiganj",
    ],
    Netrokona: [
      "Barhatta",
      " Durgapur",
      " Kendua",
      " Atpara",
      " Madan",
      " Khaliajuri",
      " Kalmakanda",
      " Mohongonj",
      " Purbadhala",
      " Netrokonasadar",
    ],
  },
  Rajshahi: {
    Sirajganj: [
      "Belkuchi",
      " Chauhali",
      " Kamarkhand",
      " Kazipur",
      " Raigonj",
      " Shahjadpur",
      " Sirajganjsadar",
      " Tarash",
      " Ullapara",
    ],
    Pabna: [
      "Sujanagar",
      " Ishurdi",
      " Bhangura",
      " Pabnasadar",
      " Bera",
      " Atghoria",
      " Chatmohar",
      " Santhia",
      " Faridpur",
    ],
    Bogura: [
      "Kahaloo",
      " Sadar",
      " Shariakandi",
      " Shajahanpur",
      " Dupchanchia",
      " Adamdighi",
      " Nondigram",
      " Sonatala",
      " Dhunot",
      " Gabtali",
      " Sherpur",
      " Shibganj",
    ],
    Rajshahi: [
      "Paba",
      " Durgapur",
      " Mohonpur",
      " Charghat",
      " Puthia",
      " Bagha",
      " Godagari",
      " Tanore",
      " Bagmara",
    ],
    Natore: [
      "Natoresadar",
      " Singra",
      " Baraigram",
      " Bagatipara",
      " Lalpur",
      " Gurudaspur",
      " Naldanga",
    ],
    Joypurhat: [
      "Akkelpur",
      " Kalai",
      " Khetlal",
      " Panchbibi",
      " Joypurhatsadar",
    ],
    Chapainawabganj: [
      "Chapainawabganjsadar",
      " Gomostapur",
      " Nachol",
      " Bholahat",
      " Shibganj",
    ],
    Naogaon: [
      "Mohadevpur",
      " Badalgachi",
      " Patnitala",
      " Dhamoirhat",
      " Niamatpur",
      " Manda",
      " Atrai",
      " Raninagar",
      " Naogaonsadar",
      " Porsha",
      " Sapahar",
    ],
  },
  Rangpur: {
    Panchagarh: [
      "Panchagarhsadar",
      " Debiganj",
      " Boda",
      " Atwari",
      " Tetulia",
    ],
    Dinajpur: [
      "Nawabganj",
      " Birganj",
      " Ghoraghat",
      " Birampur",
      " Parbatipur",
      " Bochaganj",
      " Kaharol",
      " Fulbari",
      " Dinajpursadar",
      " Hakimpur",
      " Khansama",
      " Birol",
      " Chirirbandar",
    ],
    Lalmonirhat: ["Sadar", " Kaliganj", " Hatibandha", " Patgram", " Aditmari"],
    Nilphamari: [
      "Syedpur",

      " Domar",
      " Dimla",
      " Jaldhaka",
      " Kishorganj",
      " Nilphamarisadar",
    ],
    Gaibandha: [
      "Sadullapur",
      " Gaibandhasadar",
      " Palashbari",
      " Saghata",
      " Gobindaganj",
      " Sundarganj",
      " Phulchari",
    ],
    Thakurgaon: [
      "Thakurgaonsadar",
      " Pirganj",
      " Ranisankail",
      " Haripur",
      " Baliadangi",
    ],
    Rangpur: [
      "Rangpursadar",
      " Gangachara",
      " Taragonj",
      " Badargonj",
      " Mithapukur",
      " Pirgonj",
      " Kaunia",
      " Pirgacha",
    ],
    Kurigram: [
      "Kurigramsadar",
      " Nageshwari",
      " Bhurungamari",
      " Phulbari",
      " Rajarhat",
      " Ulipur",
      " Chilmari",
      " Rowmari",
      " Charrajibpur",
    ],
  },
  Sylhet: {
    Sylhet: [
      "Balaganj",
      " Beanibazar",
      " Bishwanath",
      " Companiganj",
      " Fenchuganj",
      " Golapganj",
      " Gowainghat",
      " Jaintiapur",
      " Kanaighat",
      " Sylhetsadar",
      " Zakiganj",
      " Dakshinsurma",
      " Osmaninagar",
    ],
    Moulvibazar: [
      "Barlekha",
      " Kamolganj",
      " Kulaura",
      " Moulvibazarsadar",
      " Rajnagar",
      " Sreemangal",
      " Juri",
    ],
    Habiganj: [
      "Nabiganj",
      " Bahubal",
      " Ajmiriganj",
      " Baniachong",
      " Lakhai",
      " Chunarughat",
      " Habiganjsadar",
      " Madhabpur",
      " Shayestaganj",
    ],
    Sunamganj: [
      "Sadar",
      " Southsunamganj",
      " Bishwambarpur",
      " Chhatak",
      " Jagannathpur",
      " Dowarabazar",
      " Tahirpur",
      " Dharmapasha",
      " Jamalganj",
      " Shalla",
      " Derai",
    ],
  },
};

export default function Shipping() {
  const [alterShippingState, setAlterShippingState] = useState(true);
  const [alterShippingAddress, setAlterShippingAddress] = useState(true);
  const [division, setDivision] = useState("");
  const [district, setDistrict] = useState("");
  const [upozila, setUpozila] = useState("");
  const [shippingAddress, setshippingAddress] = useState("");

  const a = useStoreState("shippingAddress");

  useEffect(() => {
    setshippingAddress(a);
  }, [shippingAddress,a]);

  const handleOrderSubmit = () => {};
  return (
    <div className="flex flex-col items-center justify-center">
      {!alterShippingAddress && (
        <div>
          {alterShippingState && (
            <div className="flex flex-col items-center justify-center">
              <div className="locationSelect">
                <h2 className="P-2 text-lg m-2 text-center">
                  Select Division:{" "}
                </h2>
                <select
                  onChange={(e) => {
                    setDivision(e.target.value);
                    setDistrict("");
                    setUpozila("");
                  }}
                >
                  <option value={""} selected disabled hidden>
                    Please chose your devision
                  </option>
                  {Object.keys(Bangladesh).map((option) => (
                    <option value={option} key={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              {division && (
                <div className="locationSelect mt-2 ">
                  <h2 className="P-2 text-lg m-2 text-center">
                    Select District:{" "}
                  </h2>
                  <select
                    onChange={(e) => {
                      setDistrict(e.target.value);
                      setUpozila("");
                    }}
                  >
                    <option value={""} selected disabled hidden>
                      Please chose your District
                    </option>

                    {Object.keys(Bangladesh[division]).map((option) => (
                      <option value={option} key={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {district && (
                <div className="locationSelect mt-2">
                  <h2 className="P-2 text-lg m-2 text-center">
                    Select upozila:{" "}
                  </h2>
                  <select onChange={(e) => setUpozila(e.target.value)}>
                    <option value={""} selected disabled hidden>
                      Please chose your upozila
                    </option>

                    {Bangladesh[division][district].map((option) => (
                      <option value={option} key={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          )}
          {!alterShippingState && (
            <div className="flex flex-col items-center justify-center">
              <h2 className="P-2 text-lg m-2 text-center">
                Selected Address:{" "}
              </h2>
              <div className="text-xl">
                {upozila + " -" + district + " -" + division}
              </div>
            </div>
          )}
          {division && district && upozila && alterShippingState && (
            <button
              className="p-2 m-2 bg-amber-600 rounded-lg"
              onClick={() => {
                setshippingAddress({ division, district, upozila });
                setAlterShippingAddress(false);
                dispatch({
                  type: "addShippingAddress",
                  payload: { division, district, upozila },
                });
                setAlterShippingState(false);
              }}
            >
              Submit
            </button>
          )}
          {division && district && upozila && !alterShippingState && (
            <button
              className="p-2 m-2 bg-amber-600 rounded-lg"
              onClick={() => {
                setDivision("");
                setDistrict("");
                setUpozila("");
                setAlterShippingState(true);
              }}
            >
              Reselect Shipping Address
            </button>
          )}
        </div>
      )}

      {alterShippingAddress && (
        <div className="flex flex-col items-center justify-center">
          <h2 className="P-2 text-lg m-2 text-center">Selected Address: </h2>
          <div className="text-xl">{JSON.stringify(shippingAddress)}</div>
          <button
            className="primary-button"
            onClick={() => setAlterShippingAddress(false)}
          >
            {" "}
            Reselect
          </button>
        </div>
      )}
    </div>
  );
}
