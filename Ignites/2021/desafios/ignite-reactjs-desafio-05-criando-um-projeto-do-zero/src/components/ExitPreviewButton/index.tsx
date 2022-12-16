import Link from 'next/link';

export default function ExitPreviewButton() {
  return (
    <aside>
      <Link href="/api/exit-preview">
        <a>Sair do modo Preview</a>
      </Link>
    </aside>
  );
}
