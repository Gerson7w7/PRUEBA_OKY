# OKY Wallet - Transaction Explorer

Mini aplicacion construida con Gatsby + React + TypeScript + Apollo Client que consume una API GraphQL publica para simular historial de movimientos.

## Demo en vivo
Se decidió usar Netlify para el despliege de la aplicación, ya que tiene una capa gratuita y fácil de usar. 

La demo está desplegada en Netlify y puedes acceder directamente aquí:

[Demo en vivo](https://oky-prueba-gq.netlify.app/)

## Como correr el proyecto

1. `npm install`
2. `npm run develop`
3. Abrir `http://localhost:8000`

## Decisiones tecnicas

- Stack elegido: Gatsby + React + TypeScript + Apollo Client.
- API elegida: Countries GraphQL (`https://countries.trevorblades.com/graphql`) por estabilidad publica y facilidad para modelar lista/detalle.
- Patron de estado:
	- Estado remoto con `useQuery` de Apollo.
	- Estado de UI local con `useState` (filtro y pagina).
	- Derivados con `useMemo` para filtro + paginacion sin recalculos innecesarios.
- Cache de Apollo (opcional C):
	- `fetchPolicy: cache-and-network` para la lista.
	- `fetchPolicy: cache-first` para detalle.
	- `typePolicies` en `InMemoryCache` para controlar comportamiento del campo `countries`.
- Routing:
	- Home en `/`.
	- Detalle en `/country/:code`, generado con `createPages` de Gatsby en build.

## Trade-offs

- El filtro se hace del lado cliente para simplificar la UX y reducir complejidad de query variables.
- Justificacion del enfoque (Req 2): se eligio filtrado cliente porque la API publica de Countries no expone una busqueda libre unificada (por ejemplo, regex/contains sobre nombre, codigo y continente en un solo argumento). Con este enfoque la experiencia es inmediata, se evita sobrecargar la red con requests por tecla y se mantiene un comportamiento consistente durante la prueba.
- Se eligio paginacion numerica en cliente sobre toda la lista ya descargada (simple y clara para la prueba).
- No se implemento autenticacion, persistencia ni analitica, porque no eran requisitos del alcance.
- No se estilizó demasiado la UI, ya que esto requiere de un diseño más pensado y explícito, se utilizaron clases comunes y simples. 

## Lo que mas me costo

- Aprender un poco de Gatsby y la analogía/comparación con Nextjs para poder entender de mejor manera. 
- Para el detalle con rutas limpias en Gatsby, se resolvio con `createPages` en build y plantilla tipada en TypeScript.

## Cobertura de requisitos

- Req 1 - Lista paginada: completado (paginacion numerica).
- Req 2 - Filtro o busqueda: completado con filtro del lado cliente (nombre, codigo y continente), elegido por limitaciones del esquema publico para busqueda libre y para privilegiar respuesta inmediata en UI.
- Req 3 - Vista de detalle: completado (ruta dedicada con Gatsby).
- Req 4 - Estados completos: completado (loading, error con reintentar, vacio).
- Req 5 - TypeScript estricto: completado (`strict: true`, sin `any` explicito).
- Opcional A - Diseño responsivo: completado (mobile + desktop).
- Opcional B - Tests: completado (2+ tests de componentes con Vitest + Testing Library).
- Justificacion de tests elegidos (Opcional B):
	- `Pagination`: se eligio porque concentra la logica de navegacion entre paginas, que impacta directamente en la exploracion de datos y es un punto comun de regresiones (botones habilitados/deshabilitados y cambios de pagina correctos).
	- `States` (loading, error, empty): se eligio porque define la experiencia ante escenarios criticos de red/datos. Verificar estos estados reduce riesgo de UI inconsistente cuando la API tarda, falla o no devuelve resultados.
	- Enfoque: no se busco cobertura total, sino validar los flujos de mayor impacto funcional para la prueba.
- Opcional C - Cache Apollo: completado (fetch policy + refetch + type policy).
- Que se implemento (Opcional C):
	- `defaultOptions` en Apollo Client:
		- `watchQuery: cache-and-network` para listar rapido desde cache y refrescar en segundo plano.
		- `query: cache-first` para priorizar datos cacheados cuando existen.
	- `fetchPolicy` por pantalla:
		- Lista (`useCountries`): `cache-and-network` para buena percepcion de velocidad y datos actualizados.
		- Detalle (`useCountryDetail`): `cache-first` para evitar requests repetidos al volver a un pais ya consultado.
	- `typePolicies` en `InMemoryCache` para `Query.countries` (control de merge/keyArgs) y evitar comportamientos inesperados al reescribir la lista en cache.
	- `refetch` conectado al boton "Reintentar" en estados de error, para recuperacion manual sin recargar toda la app.
- Por que este enfoque:
	- La aplicacion es principalmente de lectura; por eso la estrategia de cache + refetch aporta mas valor que `optimisticResponse`.
