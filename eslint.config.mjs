import nextVitals from 'eslint-config-next/core-web-vitals';

// out.bak — старый статический экспорт (out/ переименован, чтобы не мешал сборке):
// его тоже надо игнорировать, иначе ESLint линтует готовый бандл.
export default [...nextVitals, { ignores: ['out/**', 'out.bak/**', '.next/**', 'node_modules/**'] }];
