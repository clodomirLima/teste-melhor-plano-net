import { Router } from "express";
import {
  allPlans,
  filteredPlans,
  planSearch,
  recommendPlans,
} from "../controllers/planController";

const router = Router();

router.get("/", allPlans);
router.get("/filtered", filteredPlans);
router.get("/search", planSearch);
router.get("/recommend", recommendPlans);

export default router;
