import html2pdf from 'html2pdf.js'

export function downloadAsPDF(element: HTMLElement, filename: string): Promise<void> {
  const options = {
    margin:       0,
    filename:     `${filename || 'resume'}.pdf`,
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  {
      scale:        2,
      useCORS:      true,
      logging:      false,
      letterRendering: true,
    },
    jsPDF: {
      unit:        'mm',
      format:      'a4',
      orientation: 'portrait',
    },
  }

  return html2pdf().set(options).from(element).save()
}