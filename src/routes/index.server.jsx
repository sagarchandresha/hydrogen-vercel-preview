import { Link } from "@shopify/hydrogen";
import { Suspense } from "react";

import FeaturedCollections from "../components/FeaturedCollections.server";
import { Layout } from "../components/Layout.server";
import Test from "../components/Test.client";
import ServerTest  from "./ServerTest.server";

export default function Home() {
  return (
    <Layout>
      <Suspense>
        <div className="text-center mt-4">
          <h1 className="text-lg">
            <Link to="/collections">
              Go To All Collection
            </Link>
          </h1>
          <Test />
          <ServerTest />
        </div>
      </Suspense>
    </Layout>
  );
}
