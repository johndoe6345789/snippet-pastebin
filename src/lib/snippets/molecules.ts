/**
 * Molecules - Composite UI components code snippets
 */

export const moleculesCodeSnippets = {
  formField: `interface FormFieldProps {
  label?: string
  placeholder?: string
  helperText?: string
  id?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function EmailFormField({ 
  label = "Email Address",
  placeholder = "john@example.com",
  helperText = "We'll never share your email with anyone else.",
  id = "email",
  value,
  onChange
}: FormFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <Envelope className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input id={id} type="email" placeholder={placeholder} className="pl-10" value={value} onChange={onChange} />
      </div>
      <p className="text-sm text-muted-foreground">
        {helperText}
      </p>
    </div>
  )
}`,
  searchBar: `interface SearchBarProps {
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function SearchBar({ placeholder = "Search...", value, onChange }: SearchBarProps) {
  return (
    <div className="relative">
      <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
      <Input placeholder={placeholder} className="pl-10" value={value} onChange={onChange} />
    </div>
  )
}`,
  searchBarWithButton: `interface SearchBarWithButtonProps {
  placeholder?: string
  buttonText?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onSearch?: () => void
}

function SearchBarWithButton({ 
  placeholder = "Search...",
  buttonText = "Search",
  value,
  onChange,
  onSearch
}: SearchBarWithButtonProps) {
  return (
    <div className="flex gap-2">
      <div className="relative flex-1">
        <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input placeholder={placeholder} className="pl-10" value={value} onChange={onChange} />
      </div>
      <Button onClick={onSearch}>{buttonText}</Button>
    </div>
  )
}`,
  userCard: `interface UserCardProps {
  name?: string
  username?: string
  bio?: string
  avatarUrl?: string
  avatarFallback?: string
  buttonText?: string
  onButtonClick?: () => void
}

function UserCard({ 
  name = "Alex Morgan",
  username = "@alexmorgan",
  bio = "Product designer passionate about creating delightful user experiences.",
  avatarUrl = "https://i.pravatar.cc/150?img=1",
  avatarFallback = "AM",
  buttonText = "Follow",
  onButtonClick
}: UserCardProps) {
  return (
    <Card className="p-6">
      <div className="flex items-start gap-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={avatarUrl} />
          <AvatarFallback>{avatarFallback}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-lg">{name}</h3>
          <p className="text-sm text-muted-foreground">{username}</p>
          <p className="text-sm mt-2">
            {bio}
          </p>
        </div>
        <Button size="sm" variant="outline" onClick={onButtonClick}>
          {buttonText}
        </Button>
      </div>
    </Card>
  )
}`,
  socialActions: `interface SocialActionsProps {
  likeText?: string
  commentText?: string
  shareText?: string
  onLike?: () => void
  onComment?: () => void
  onShare?: () => void
}

function SocialActions({ 
  likeText = "Like",
  commentText = "Comment",
  shareText = "Share",
  onLike,
  onComment,
  onShare
}: SocialActionsProps) {
  return (
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="sm" onClick={onLike}>
        <Heart className="mr-2" />
        {likeText}
      </Button>
      <Button variant="ghost" size="sm" onClick={onComment}>
        <ChatCircle className="mr-2" />
        {commentText}
      </Button>
      <Button variant="ghost" size="sm" onClick={onShare}>
        <Share className="mr-2" />
        {shareText}
      </Button>
    </div>
  )
}`,
  statusIndicator: `interface StatusIndicatorProps {
  statusText?: string
  badgeText?: string
  isActive?: boolean
}

function StatusIndicator({ 
  statusText = "System Online",
  badgeText = "Active",
  isActive = true
}: StatusIndicatorProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className={cn(
          "h-3 w-3 rounded-full bg-accent",
          isActive && "animate-pulse"
        )} />
        <span className="font-medium">{statusText}</span>
      </div>
      <Badge>{badgeText}</Badge>
    </div>
  )
}`,
  contentCard: `interface ContentCardProps {
  title?: string
  description?: string
  date?: string
  readTime?: string
  tags?: string[]
}

function ContentCard({ 
  title = "Building Scalable Design Systems",
  description = "Learn how to create and maintain design systems that grow with your team.",
  date = "Mar 15, 2024",
  readTime = "5 min read",
  tags = ["Design", "System"]
}: ContentCardProps) {
  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <h3 className="font-semibold text-lg line-clamp-2">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {description}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{date}</span>
          </div>
          <span>•</span>
          <span>{readTime}</span>
        </div>
        <div className="flex gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="outline">{tag}</Badge>
          ))}
        </div>
      </div>
    </Card>
  )
}`,
}

