CREATE TYPE "public"."gender" AS ENUM('male', 'female', 'other');--> statement-breakpoint
CREATE TYPE "public"."role" AS ENUM('buyer', 'seller', 'admin', 'superAdmin');--> statement-breakpoint
CREATE TYPE "public"."status" AS ENUM('active', 'inactive', 'blocked', 'pending');--> statement-breakpoint
CREATE TABLE "buyers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" uuid NOT NULL,
	"firstName" varchar(100) NOT NULL,
	"lastName" varchar(100) NOT NULL,
	"gender" "gender" NOT NULL,
	"dateOfBirth" timestamp,
	"contactNo" varchar(20),
	"contactName" varchar(100),
	"presentAddress" text,
	"profileImage" text,
	"isDeleted" boolean DEFAULT false,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	CONSTRAINT "buyers_userId_unique" UNIQUE("userId")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" text NOT NULL,
	"role" "role" DEFAULT 'buyer' NOT NULL,
	"status" "status" DEFAULT 'active' NOT NULL,
	"passwordChangeAt" timestamp,
	"roleChangeAt" timestamp,
	"otherDevicesLogOutAt" timestamp,
	"isActive" boolean DEFAULT false,
	"isDeleted" boolean DEFAULT false,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
