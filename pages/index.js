import Slideshow from "../components/slideShow";
import ShowProductTiles from "../components/showProductTiles";
import state from "../utils/state";
import Layout from "../components/layout";
import CategoreyBar from "./categoreyBar";

const images = [
  "/home_slide/COLMI_P28_Plus_big_banner_1_.jpg",
  "/home_slide/F13_Big_Banner_1_.jpg",
  "/home_slide/Get_Going_with_Grooming_9_big_banner_1_.jpg",
  "/home_slide/hassle-free_winter_shower_big_banner_1_1_.jpg",
  "/home_slide/N20_SE_Big_Banner_1_1_.jpg",
  "/home_slide/T20_world_cup_big_banner_1_1_.jpg",
];

export function Home({ products }) {
  return (
    <Layout>
      <div className="sticky top-0 z-50 bg-white  shadow-lg mb-1">
        <CategoreyBar></CategoreyBar>
      </div>
      <Slideshow images={images}> </Slideshow>
      <ShowProductTiles products={products}></ShowProductTiles>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  var existingProduct = await fetch(
    `http://localhost:3000/api/user/product/productsGet`
  );
  const products = await existingProduct.json();

  return {
    props: {
      products,
    },
  };
}

export default Home;
