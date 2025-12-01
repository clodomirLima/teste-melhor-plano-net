import { Plan } from "../models/plan";

export const allPlansMock: Plan[] = [
  {
    id: 1,
    name: "Plano Básico",
    speed: "100Mbps",
    price: 79.9,
    operator: "Vivo",
    city: "São Paulo",
    dataCap: 200,
  },
  {
    id: 2,
    name: "Plano Intermediário",
    speed: "300Mbps",
    price: 99.9,
    operator: "Claro",
    city: "Rio de Janeiro",
    dataCap: 400,
  },
  {
    id: 3,
    name: "Plano Premium",
    speed: "600Mbps",
    price: 149.9,
    operator: "TIM",
    city: "Belo Horizonte",
    dataCap: 800,
  },
  {
    id: 4,
    name: "Plano Família",
    speed: "500Mbps",
    price: 129.9,
    operator: "Vivo",
    city: "Curitiba",
    dataCap: 600,
  },
  {
    id: 5,
    name: "Plano Ultra",
    speed: "1Gbps",
    price: 199.9,
    operator: "Claro",
    city: "São Paulo",
    dataCap: 1000,
  },
  {
    id: 6,
    name: "Plano Econômico",
    speed: "50Mbps",
    price: 59.9,
    operator: "Oi",
    city: "Recife",
    dataCap: 100,
  },
  {
    id: 7,
    name: "Plano Regional",
    speed: "200Mbps",
    price: 89.9,
    operator: "TIM",
    city: "Porto Alegre",
    dataCap: 300,
  },
  {
    id: 8,
    name: "Plano Flex",
    speed: "400Mbps",
    price: 109.9,
    operator: "Vivo",
    city: "Salvador",
    dataCap: 500,
  },
  {
    id: 9,
    name: "Plano Jovem",
    speed: "150Mbps",
    price: 69.9,
    operator: "Claro",
    city: "Fortaleza",
    dataCap: 250,
  },
  {
    id: 10,
    name: "Plano Top",
    speed: "2Gbps",
    price: 299.9,
    operator: "TIM",
    city: "Brasília",
    dataCap: 2000,
  },
  {
    id: 11,
    name: "Vivo Turbo",
    speed: "250Mbps",
    price: 109.9,
    operator: "Vivo",
    city: "Campinas",
    dataCap: 350,
  },
  {
    id: 12,
    name: "Vivo Max",
    speed: "800Mbps",
    price: 179.9,
    operator: "Vivo",
    city: "São Paulo",
    dataCap: 1200,
  },
  {
    id: 13,
    name: "Vivo Light",
    speed: "70Mbps",
    price: 64.9,
    operator: "Vivo",
    city: "Ribeirão Preto",
    dataCap: 150,
  },
  {
    id: 14,
    name: "Vivo Família Plus",
    speed: "600Mbps",
    price: 139.9,
    operator: "Vivo",
    city: "São Paulo",
    dataCap: 900,
  },
  {
    id: 15,
    name: "Vivo Ultra HD",
    speed: "1.5Gbps",
    price: 249.9,
    operator: "Vivo",
    city: "Sorocaba",
    dataCap: 1800,
  },
  {
    id: 16,
    name: "Vivo Conecta+",
    speed: "120Mbps",
    price: 89.9,
    operator: "Vivo",
    city: "São Paulo",
    dataCap: 220,
  },
  {
    id: 17,
    name: "Vivo Família 400",
    speed: "400Mbps",
    price: 129.9,
    operator: "Vivo",
    city: "São Paulo",
    dataCap: 700,
  },
  {
    id: 18,
    name: "Vivo Ultra 2Gbps",
    speed: "2Gbps",
    price: 299.9,
    operator: "Vivo",
    city: "São Paulo",
    dataCap: 2200,
  },
  {
    id: 19,
    name: "Vivo Light 60",
    speed: "60Mbps",
    price: 59.9,
    operator: "Vivo",
    city: "São Paulo",
    dataCap: 120,
  },
  {
    id: 20,
    name: "Vivo Max 900",
    speed: "900Mbps",
    price: 189.9,
    operator: "Vivo",
    city: "São Paulo",
    dataCap: 1400,
  },
];

export function getPlans(): Plan[] {
  return allPlansMock;
}

export function getAllPlans(): Plan[] {
  return allPlansMock;
}

export function filterAndNormalizePlans(
  plans: Plan[],
  minSpeed?: number,
  maxPrice?: number
): Plan[] {

  return plans
    .filter(plan => meetsSpeedRequirement(plan, minSpeed))
    .filter(plan => meetsPriceRequirement(plan, maxPrice))
    .map(normalizePlan);
}

function meetsSpeedRequirement(plan: Plan, minSpeed?: number): boolean {
  if (!minSpeed) return true;

  const speed = parseInt(plan.speed.replace("Mbps", ""), 10);
  const result = speed >= minSpeed;
  return result
}

function meetsPriceRequirement(plan: Plan, maxPrice?: number): boolean {
  if (!maxPrice) return true;
  const result = plan.price <= maxPrice;
  return result;
}

function normalizePlan(plan: Plan): Plan {
  if (plan.price < 100) {
    return { ...plan };
  }

  return plan;
}

export interface PlanSearchFilters {
  minPrice?: number;
  maxPrice?: number;
  minDataCap?: number;
  maxDataCap?: number;
  operator?: string;
  city?: string;
  name?: string;
}

export interface PaginatedPlans {
  plans: Plan[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface RecommendationFilters {
  city?: string;
  maxPrice?: number;
  operator?: string;
}

export function searchPlans(
  filters: PlanSearchFilters = {},
  page: number = 1,
  pageSize: number = 5
): PaginatedPlans {

  const {
    minPrice = null,
    maxPrice = null,
    minDataCap = null,
    maxDataCap = null,
    operator = '',
    city = '',
    name = ''
  } = filters;

  let filtered = allPlansMock;

  if (minPrice !== null) filtered = filtered.filter(p => p.price >= minPrice);
  if (maxPrice !== null) filtered = filtered.filter(p => p.price <= maxPrice);
  if (minDataCap !== null) filtered = filtered.filter(p => p.dataCap >= minDataCap);
  if (maxDataCap !== null) filtered = filtered.filter(p => p.dataCap <= maxDataCap);

  if (operator) filtered = filtered.filter(p => p.operator.toLowerCase() === operator.toLowerCase());
  if (city) filtered = filtered.filter(p => p.city.toLowerCase() === city.toLowerCase());
  if (name) filtered = filtered.filter(p => p.name.toLowerCase().includes(name.toLowerCase()));
  const total = filtered.length;
  const totalPages = Math.ceil(total / pageSize);

  return {
    plans: filtered.slice((page - 1) * pageSize, page * pageSize),
    total,
    page,
    pageSize,
    totalPages,
  };
}

export function getRecommendedPlans(filters: RecommendationFilters): Plan[] {
  let plans = allPlansMock;
  let result: any[] = [];

  const {
    maxPrice = null,
    operator = '',
    city = '',
  } = filters;

  if (city) result = plans.filter(p => p.city.toLowerCase() === city.toLowerCase());

  if (maxPrice) result = plans.filter(p => p.price <= maxPrice);

  if (operator) result = plans.filter(p => p.operator.toLowerCase() === operator.toLowerCase());

  return result
    .map(plan => ({
      ...plan,
      score: calculateScore(plan, filters)
    }))
    .sort((a, b) => b.score - a.score);
}

function calculateScore(plan: Plan, filters: RecommendationFilters): number {
  let score = 0;

  if (filters.maxPrice && plan.price <= filters.maxPrice) score += 30;
  if (filters.city && plan.city.toLowerCase() === filters.city.toLowerCase()) score += 40;
  if (filters.operator && plan.operator === filters.operator) score += 30;

  return score;
}