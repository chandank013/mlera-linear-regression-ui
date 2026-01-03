export function Footer() {
  return (
    <footer className="w-full border-t">
      <div className="container mx-auto py-6 px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} MLera. All rights reserved.</p>
          <p>Internship Assignment Submission</p>
        </div>
      </div>
    </footer>
  )
}
