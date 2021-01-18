const dynamicString = (
  templateString: string,
  templateVariables: Record<string, string>
) => templateString.replace(/\${(.*?)}/g, (_, g) => templateVariables[g])

export default dynamicString
