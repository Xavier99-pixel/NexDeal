# Publish NexDeal From VS Code

Use this guide to publish your local NexDeal project to a public URL that Amazon Associates can review.

## Before Publishing

Make sure these pages open locally:

- `http://localhost:3000/`
- `http://localhost:3000/about`
- `http://localhost:3000/contact`
- `http://localhost:3000/privacy`
- `http://localhost:3000/terms`

## Step 1: Open Project In VS Code

1. Open VS Code.
2. Choose `File > Open Folder`.
3. Select:

```txt
/Users/tirumalarajavardhan/Downloads/affiliate-marketing-website
```

## Step 2: Install Dependencies

Open VS Code terminal:

```bash
corepack enable pnpm
pnpm install
```

If `pnpm` gives a problem, use:

```bash
npx pnpm@10.23.0 install
```

## Step 3: Test Locally

Run:

```bash
pnpm dev
```

Open:

```txt
http://localhost:3000
```

## Step 4: Build Check

Run:

```bash
pnpm build
```

If that works, your project is ready to publish.

## Step 5: Push To GitHub

1. Create a GitHub account if you do not have one.
2. Create a new repository named `nexdeal`.
3. In VS Code terminal, run:

```bash
git init
git add .
git commit -m "Initial NexDeal website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/nexdeal.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

## Step 6: Deploy To Vercel

1. Go to `https://vercel.com`.
2. Sign in with GitHub.
3. Click `Add New Project`.
4. Select your `nexdeal` repository.
5. Framework should be detected as `Next.js`.
6. Click `Deploy`.
7. Vercel will give you a public URL like:

```txt
https://nexdeal.vercel.app
```

Use this public URL in Amazon Associates signup if your custom domain is not ready.

## Step 7: Connect www.nexdeal.com

After buying the domain:

1. Open your Vercel project.
2. Go to `Settings > Domains`.
3. Add:

```txt
nexdeal.com
www.nexdeal.com
```

4. Vercel will show DNS records.
5. Add those DNS records in your domain registrar account.
6. Wait for DNS verification.

## Step 8: Submit To Amazon Associates

Use one of these:

- Temporary Vercel URL: `https://nexdeal.vercel.app`
- Final domain: `https://www.nexdeal.com`

Do not use:

- `localhost:3000`
- an empty coming-soon page
- a domain that does not open publicly

## Step 9: Add Affiliate Links

1. Log in to Amazon Associates.
2. Open Amazon.in product page.
3. Use SiteStripe to generate the affiliate text link.
4. Open `lib/products.ts`.
5. Paste the link into `affiliateLink`.
6. Run `pnpm build`.
7. Commit and push changes.
8. Vercel will redeploy automatically.
