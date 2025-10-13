import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type FeatureCardProps = {
  title: string
  description: string
  imageQuery: string
  href?: string
}

export function FeatureCard({ title, description, imageQuery, href = "#" }: FeatureCardProps) {
  return (
    <Card className="h-full overflow-hidden">
      <CardHeader className="p-0">
        <Image
          // src={`/.jpg?height=180&width=380&query=${encodeURIComponent(imageQuery)}`}
          src={imageQuery}
          alt={title}
          width={380}
          height={180}
          className="h-[180px] w-full object-cover"
        />
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-base">{title}</CardTitle>
        <p className="mt-2 line-clamp-4 text-xs leading-6 text-muted-foreground">{description}</p>
        <Link href={href} className="mt-3 inline-flex text-xs font-medium text-accent hover:underline">
          Learn more
        </Link>
      </CardContent>
    </Card>
  )
}
