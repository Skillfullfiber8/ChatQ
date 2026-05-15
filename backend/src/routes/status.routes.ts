import { Router }
from "express";

import {

  latestQr,

  isWhatsappReady,

} from "../modules/whatsapp/client";

const router =
  Router();

router.get(
  "/",

  (req, res) => {

    res.json({

      ready:
        isWhatsappReady,

      qr:
        latestQr,

    });
  }
);

export default router;