import type { Resume } from '../../lib/types'
import NovaTemplate  from './templates/NovaTemplate'
import SlateTemplate from './templates/SlateTemplate'
import PrismTemplate from './templates/PrismTemplate'

interface ResumePreviewProps {
  resume: Resume
}

export default function ResumePreview({ resume }: ResumePreviewProps) {
  switch (resume.templateId) {
    case 'slate': return <SlateTemplate r={resume} />
    case 'prism': return <PrismTemplate r={resume} />
    default:      return <NovaTemplate  r={resume} />
  }
}