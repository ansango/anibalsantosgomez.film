import { isAuthorized } from "@tinacms/auth";
import type { NextApiRequest } from "next";
import { mediaHandlerConfig, createMediaHandler } from "next-tinacms-s3/dist/handlers";

export const config = mediaHandlerConfig;

const authorized = async (req: NextApiRequest): Promise<boolean> => {
  try {
    if (process.env.NODE_ENV == "development") {
      return true;
    }

    const user = await isAuthorized(req);

    return (user && user.verified) as boolean;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export default createMediaHandler({
  config: {
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY || "",
      secretAccessKey: process.env.S3_SECRET_KEY || "",
    },
    region: process.env.S3_REGION,
  },
  bucket: process.env.S3_BUCKET || "",
  authorized,
});
