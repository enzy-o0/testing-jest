export function codeCoverage100(cond1: boolean, cond2: boolean) {
  const obj1: Record<string, Record<string,string>> = {};

  if (cond1) {
    obj1.a = {};
  }

  if (cond2) {
    obj1.a.b = 'inner'
  }

  return obj1;
}