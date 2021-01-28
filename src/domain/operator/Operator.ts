export type Operator = {
  id: string
  name: string
  display_name: string
  logo_url: string
}

export const getOperatorById = (operators: Operator[], id: Operator['id']) => {
  return operators.find((operator) => operator.id === id)!
}
