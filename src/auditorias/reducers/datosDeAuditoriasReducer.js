
export const datosDeAuditoriasReducer = (state = [], { type, auditorias }) => {
  switch (type) {
    case 'SET_AUDITORIAS':
      return auditorias
    default:
      return state
  }
}
