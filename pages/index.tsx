import React from "react";
import { Button, useToast } from "@chakra-ui/core";
import { PRODUCTS } from "./../graphql/vendor";
import { useToken } from "../Context/TokenProvider";
import { addToCart } from "../graphql/customer";
import { ProductsRes } from "../Typescript/types";
import Link from "next/link";
import { useQuery } from "./../components/useQuery";
import { useMutation } from "../utils/useMutation";
import { useRouter } from "next/router";

const Home = () => {
  const { Token } = useToken();
  const router = useRouter();
  const toast = useToast();
  const [data, loading, error] = useQuery(PRODUCTS, { limit: null });
  let res = data ? data.products : undefined;

  async function addCart(product_id, prod_creator_id) {
    const variables = {
      product_id,
      prod_creator_id,
    };
    const { data, error } = await useMutation(addToCart, variables, Token);

    if (data) {
      toast({
        title: "Item Added to Cart!",
        description: `Your Item has been added to cart, proceed to checkout`,
        status: "success",
        duration: 7000,
        isClosable: true,
        position: "top",
      });
    }
    if (error) {
      //handled this error cos chakra ui "status" should be "info"
      if (error.response?.errors[0].message === "Item is already in Cart") {
        toast({
          title: "Item is already in Cart",
          description: "Please Visit your Cart page to checkout",
          status: "info",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        return;
      }

      toast({
        title: "An Error occurred while adding to cart.",
        //if theres a graphql error, show it, else display other errors
        description: error.response?.errors[0].message
          ? error.response?.errors[0].message
          : error.message === "Network request failed"
          ? "Check Your Internet Connection and Refressh"
          : error.message,
        status: "error",
        duration: 7000,
        isClosable: true,
        position: "top",
      });
    }
  }
  return (
    <div>
      <>
        {error &&
          toast({
            title: "An error occurred.",
            description: "check your internet connection and refresh.",
            status: "error",
            duration: 7000,
            isClosable: true,
            position: "top",
          })}
      </>
      {loading && "loading..."}
      <main>
        {res &&
          res.map((p: ProductsRes) => (
            <div key={p.id}>
              <div>
                <strong>PRODUCT NAME:</strong>
                {p.name}
              </div>
              <div>
                <Link
                  href={`/product/${p.name_slug}`}
                  as={`/product/${p.name_slug}`}
                >
                  <a>Visit Product Page</a>
                </Link>
              </div>
              <div>
                <strong>Creator ID:</strong>
                {p.creator_id}
              </div>
              <div>
                <strong>Available Qty:</strong> {p.available_qty}
              </div>
              <div>
                <strong>in stock:</strong> {p.in_stock}
              </div>
              <Button
                variantColor="yellow"
                onClick={() => {
                  if (!Token) {
                    router.push("/customer/account");
                    return;
                  }
                  addCart(p.id, p.creator_id);
                }}
              >
                Add to Cart
              </Button>
              <br />
              <br />
            </div>
          ))}
      </main>
    </div>
  );
};

export default Home;
