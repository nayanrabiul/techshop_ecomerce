import ShowProductTiles from "../..//components/showProductTiles";
import AdminLayout from "../../components/adminLayout";
import Link from "next/link";
import useRouter from "next/router";
import Image from "next/image";

function Home({ products }) {
  const router = useRouter;

  return (
    <AdminLayout>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Items
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <div
                key={product.id}
                onClick={() => {}}
                className="group relative"
              >
                <div className="h-404 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-40">
                  <Link href={`/productDetails/${product.id}`}>
                    <Image
                      src={`https://techshopapi.imnayan.xyz/public/${
                        product.images.split(",")[0]
                      }`}
                      alt={product.title}
                      height={100}
                      width={100}
                      className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    />
                  </Link>
                </div>
                <div className="mt-4 flex flex-col justify-between">
                  <div>
                    <Link href={`/productDetails/${product.id}`}>
                      <h3 className="text-xl font-bold text-gray-700">
                        {product.title}
                      </h3>
                    </Link>

                    <p>{product.price}</p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    ৳ {product.price}
                  </p>
                  <button
                    onClick={() =>
                      router.push("/admin/productEdit/" + product.id)
                    }
                    className="p-2 m-2 bg-orange-400 rounded-md active:bg-orange-600"
                  >
                    Edit Product
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export async function getServerSideProps(context) {
  var existingProduct = await fetch(
    `https://techshopapi.imnayan.xyz/api/user/product/productsGet`
  );
  const products = await existingProduct.json();

  return {
    props: {
      products,
    },
  };
}

Home.auth = { adminOnly: true };
export default Home;
