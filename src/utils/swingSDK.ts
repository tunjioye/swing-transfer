import { publicRuntimeConfig } from "@/config";
import SwingSDK from "@swing.xyz/sdk";

export const swingSDK = new SwingSDK({
  projectId: publicRuntimeConfig.SWING_PROJECT_ID,
});

swingSDK.init();

export default swingSDK;
