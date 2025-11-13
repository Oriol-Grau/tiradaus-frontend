export const validarCampsRequerits = (values) => {
  const errors = {};

  const isEmpty = (v) =>
    v === undefined ||
    v === null ||
    (typeof v === "string" && v.trim() === "") ||
    (Array.isArray(v) && v.length === 0);

  const check = (obj, path = "") => {
    if (typeof obj !== "object" || obj === null) return;
    Object.keys(obj).forEach((key) => {
      const val = obj[key];
      const fullKey = path ? `${path}.${key}` : key;

      if (typeof val === "object" && val !== null && !Array.isArray(val)) {
        // recurse into nested object
        check(val, fullKey);
      } else {
        if (isEmpty(val)) {
          errors[fullKey] = "Aquest camp és requerit";
        }
      }
    });
  };

  check(values);

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validarEmail = (email) => {
  const value = typeof email === "string" ? email.trim() : "";

  if (!value) {
    return { isValid: false, error: "Aquest camp és requerit" };
  }
  
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(value)) {
    return { isValid: false, error: "Correu electrònic invàlid" };
  }

  return { isValid: true, error: null };
};