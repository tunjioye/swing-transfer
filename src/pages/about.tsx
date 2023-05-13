import React from "react";
import { publicRuntimeConfig } from "@/config";

function about() {
  return (
    <main className="container" role="document">
      <hgroup className="readPost">
        <h2>About {publicRuntimeConfig.APP_NAME}</h2>
        <h3> some description </h3>
      </hgroup>

      <h6>Hi welcome, </h6>

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus accusantium esse voluptas
        quasi voluptates debitis at ut eligendi magni perspiciatis, eius molestiae consectetur
        assumenda dolorem architecto vero hic? Ad, incidunt. Lorem ipsum dolor sit amet, consectetur
        adipisicing elit. Quas dolor obcaecati dolore impedit quo reiciendis odit quasi sapiente
        eius, porro incidunt error sunt pariatur voluptate veritatis.
      </p>

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus sed soluta enim est
        quaerat quas, officiis sequi quibusdam nihil asperiores aliquid ipsa saepe sapiente
        voluptate accusamus tenetur sit labore velit!
      </p>

      <p>Thanks for reading</p>
    </main>
  );
}

export default about;
