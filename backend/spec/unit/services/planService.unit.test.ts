import {
  getPlans,
  getAllPlans,
  filterAndNormalizePlans,
  searchPlans,
  getRecommendedPlans,
} from "../../../src/services/planService";

describe("Plan Service", () => {

  // ----------------------------- //
  // TESTES BÁSICOS DE RETORNO     //
  // ----------------------------- //
  
  test("getPlans deve retornar lista com 20 planos", () => {
    const plans = getPlans();
    expect(plans.length).toBe(20);
  });

  test("getAllPlans deve retornar a mesma lista de planos", () => {
    const plans = getAllPlans();
    expect(plans.length).toBe(20);
  });


  // ----------------------------- //
  // TESTES filterAndNormalizePlans//
  // ----------------------------- //

  test("Deve filtrar planos com velocidade mínima de 300 Mbps", () => {
    const result = filterAndNormalizePlans(getPlans(), 300);
    expect(result.every(p => parseInt(p.speed) >= 300)).toBe(true);
  });

  test("Deve filtrar planos com preço máximo 100", () => {
    const result = filterAndNormalizePlans(getPlans(), undefined, 100);
    expect(result.every(p => p.price <= 100)).toBe(true);
  });

  test("Deve retornar apenas planos que atendem *AMBOS* os filtros", () => {
    const result = filterAndNormalizePlans(getPlans(), 300, 120);
    expect(result.every(p => parseInt(p.speed) >= 300 && p.price <= 120)).toBe(true);
  });


  // ----------------------------- //
  // TESTE DE PAGINAÇÃO searchPlans//
  // ----------------------------- //

  test("searchPlans deve paginar corretamente (page=1, pageSize=5)", () => {
    const result = searchPlans({}, 1, 5);

    expect(result.plans.length).toBe(5);
    expect(result.total).toBe(20);
    expect(result.page).toBe(1);
    expect(result.totalPages).toBe(4);
  });

  test("searchPlans deve filtrar por cidade", () => {
    const result = searchPlans({ city: "São Paulo" });
    expect(result.plans.every(p => p.city === "São Paulo")).toBe(true);
  });

  test("searchPlans deve aplicar filtro por preço mínimo", () => {
    const result = searchPlans({ minPrice: 100 });
    expect(result.plans.every(p => p.price >= 100)).toBe(true);
  });


  // ----------------------------- //
  // TESTES getRecommendedPlans    //
  // ----------------------------- //

  test("getRecommendedPlans deve recomendar apenas planos da cidade escolhida", () => {
    const result = getRecommendedPlans({ city: "São Paulo" });
    expect(result.every(p => p.city === "São Paulo")).toBe(true);
  });

  test("getRecommendedPlans deve retornar planos até 100 reais se maxPrice=100", () => {
    const result = getRecommendedPlans({ maxPrice: 100 })
      .filter(p => p.price <= 100);

    expect(result.length).toBeGreaterThan(0);
  });

});
