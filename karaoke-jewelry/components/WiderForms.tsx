export function WiderForms() {
  return (
    <style>{`
      [data-ui="DocumentPane"] [data-ui="ScrollContainer"] > div { max-width: 100% !important; }
      [data-testid="document-panel-scroller"] > div { max-width: 100% !important; }
      [data-ui="FormBuilder"] { max-width: 900px !important; }
    `}</style>
  )
}
