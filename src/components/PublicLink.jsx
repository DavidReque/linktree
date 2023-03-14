export const PublicLink = ({url, title, docId}) => {
  return (
    <div key={docId}>
            <a href={url}>{title}</a>
          </div>
  )
}
