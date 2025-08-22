import React, { useEffect,  useState } from "react";
import {
  LogOut,
  Mail,
  User2,
  ShieldCheck,
  Car,
  ShoppingCart,
} from "lucide-react";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ProfilePage( ) {
  const [cartItem, setCartItem] = useState([]);
  const [user, setUser] = useState({});
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const savedUser = JSON.parse(localStorage.getItem("user")) || {};
  const userId = savedUser.id;

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItem(savedCart);
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders);
  }, []);

  useEffect(() => {
    setUser(savedUser);
    setInput({
      firstName: savedUser.firstName || "",
      lastName: savedUser.lastName || "",
      email: savedUser.email || "",
    });
  }, []);

  const handleChangePassword = async () => {
    if (oldPass !== savedUser.password) {
      alert("Köhnə parol düzgün deyil ");
      return;
    }

    if (newPass !== confirmPass) {
      alert("Yeni parol və təkrar eyni deyil ");
      return;
    }

    try {
      // API-yə PUT request
      await axios.put(
        `https://67ee3f81c11d5ff4bf78e1b1.mockapi.io/signUp/${userId}`,
        { password: newPass }
      );

      // localStorage-i yenilə
      const updatedUser = { ...savedUser, password: newPass };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);

      alert("Parol uğurla dəyişdirildi");

      setOldPass("");
      setNewPass("");
      setConfirmPass("");
    } catch (error) {
      console.error(error);
      alert("Xəta baş verdi, yenidən cəhd edin");
    }
  };

 
  const initials = `${(user.firstName?.[0] ?? "").toUpperCase()}${(
    user.lastName?.[0] ?? ""
  ).toUpperCase()}`;

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...user,
      firstName: input.firstName.trim(),
      lastName: input.lastName.trim(),
      email: input.email.trim(),
    };
    try {
      await axios.put(
        `https://67ee3f81c11d5ff4bf78e1b1.mockapi.io/signUp/${userId}`,
        payload
      );
      localStorage.setItem("user", JSON.stringify(payload));
      setUser(payload);
      alert("Hesab məlumatları uğurla yeniləndi ✅");
    } catch (error) {
      console.error(error);
      alert("Xəta baş verdi ");
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    navigate("/signIn");
    window.location.reload();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="min-h-[80vh] w-full bg-white text-neutral-900"
    >
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b">
        <div className="container mx-auto px-4 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={user.avatarUrl} alt={user.firstName} />
              <AvatarFallback>{initials || "U"}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm text-neutral-500">Xoş gəldin</p>
              <h1 className="text-2xl font-semibold tracking-tight">
                {user.firstName} {user.lastName}
              </h1>
            </div>
          </div>
          <Button
            variant="outline"
            className="rounded-2xl"
            onClick={handleSignOut}
          >
            <LogOut className="mr-2 h-4 w-4" /> Hesabdan çıx
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="container mx-auto px-4 py-6">
        <Tabs defaultValue="products" className="w-full">
          <TabsList className="grid w-full grid-cols-3 rounded-2xl   p-1">
            <TabsTrigger
              value="products"
              className=" not-visited:px-3 py-2 text-sm sm:text-base flex items-center justify-center gap-2 text-neutral-600"
            >
              <ShoppingCart className="h-4 w-4" /> Məhsullarım
            </TabsTrigger>
            <TabsTrigger
              value="account"
              className=" px-3 py-2 text-sm sm:text-base flex items-center justify-center gap-2 text-neutral-600"
            >
              <User2 className="h-4 w-4" /> Hesabım
            </TabsTrigger>
            <TabsTrigger
              value="logout"
              className="  px-3 py-2 text-sm sm:text-base flex items-center justify-center gap-2 text-neutral-600"
            >
              <LogOut className="h-4 w-4" /> Çıxış
            </TabsTrigger>
          </TabsList>

          {/* Products Tab */}
          <TabsContent value="products" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="rounded-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                    <ShoppingCart className="h-5 w-5" /> Səbətdə olanlar
                  </CardTitle>
                  <CardDescription>
                    Hazırda sifariş üçün seçdiyiniz məhsullar
                  </CardDescription>
                </CardHeader>
                <div className="flex flex-col gap-4 px-5">
                  {cartItem.length === 0 ? (
                    <p>Hələ məhsul əlavə olunmayıb </p>
                  ) : (
                    cartItem.map((item) => (
                      <Card
                        key={item.id}
                        className="flex gap-4 p-4 items-center"
                      >
                        <img
                          src={item.img}
                          alt={item.name}
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                        <CardContent>
                          <CardTitle>{item.name}</CardTitle>
                          <p className="text-gray-600">${item.price}</p>
                          <p className="text-sm text-gray-500">
                            Quantity: {item.quantity}
                          </p>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </Card>

              {/* Orders Tab */}
              <Card className="rounded-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                    <Car className="h-5 w-5" /> Sifarişlərim
                  </CardTitle>
                  <CardDescription>Keçmiş və aktiv sifarişlər</CardDescription>
                </CardHeader>
                 <div className="container mx-auto p-4">
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {orders.map((order) => (
                        <div
                          key={order.id}
                          className="border rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col"
                        >
                          <img
                            src={order.image}
                            alt={order.name}
                            className="w-full h-48 object-cover rounded mb-4"
                          />
                          <h2 className="text-xl font-semibold">
                            {order.name}
                          </h2>
                          <p className="text-gray-600 capitalize">
                            Version: {order.version}
                          </p>
                          <p className="text-gray-600 capitalize">
                            Color: {order.color}
                          </p>
                          <p className="text-lg font-bold mt-2">
                            {order.price}
                          </p>
                          <p className="text-gray-400 text-sm mt-1">
                            Sifariş tarixi:{" "}
                            {new Date(order.date).toLocaleDateString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
              </Card>
            </div>
          </TabsContent>

          {/* Account Tab */}
          <TabsContent value="account" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="rounded-2xl lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                    <User2 className="h-5 w-5" /> Hesab məlumatları
                  </CardTitle>
                  <CardDescription>
                    Ad, soyad və email məlumatlarınızı yeniləyin
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form
                    onSubmit={handleProfileSubmit}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                  >
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Ad</Label>
                      <Input
                        id="firstName"
                        value={input.firstName}
                        onChange={(e) =>
                          setInput({ ...input, firstName: e.target.value })
                        }
                        placeholder="Ad"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Soyad</Label>
                      <Input
                        id="lastName"
                        value={input.lastName}
                        onChange={(e) =>
                          setInput({ ...input, lastName: e.target.value })
                        }
                        placeholder="Soyad"
                        required
                      />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                        <Input
                          id="email"
                          type="email"
                          value={input.email}
                          onChange={(e) =>
                            setInput({ ...input, email: e.target.value })
                          }
                          className="pl-10"
                          placeholder="example@mail.com"
                          required
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-2 flex justify-end">
                      <Button type="submit" className="rounded-2xl px-6">
                        Yenilə
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>

              {/* Change Password */}
              <Card className="rounded-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                    <ShieldCheck className="h-5 w-5" /> Parol dəyiş
                  </CardTitle>
                  <CardDescription>
                    Təhlükəsizliyiniz üçün güclü parol seçin
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current">Cari parol</Label>
                    <Input
                      id="current"
                      type="password"
                      placeholder="••••••••"
                      value={oldPass}
                      onChange={(e) => setOldPass(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="next">Yeni parol</Label>
                    <Input
                      id="next"
                      type="password"
                      placeholder="Minimum 6 simvol"
                      value={newPass}
                      onChange={(e) => setNewPass(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm">Təkrar yeni parol</Label>
                    <Input
                      id="confirm"
                      type="password"
                      placeholder="Yenidən daxil edin"
                      value={confirmPass}
                      onChange={(e) => setConfirmPass(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button
                      onClick={handleChangePassword}
                      className="rounded-2xl px-6"
                    >
                      Parolu dəyiş
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Logout Tab */}
          <TabsContent value="logout" className="mt-6">
            <Card className="rounded-2xl max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <LogOut className="h-5 w-5" /> Hesabdan çıxış
                </CardTitle>
                <CardDescription>
                  Hesabdan çıxış etdikdən sonra yenidən daxil olmaq üçün email
                  və paroldan istifadə etməlisiniz.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={user.avatarUrl} alt={user.firstName} />
                    <AvatarFallback>{initials || "U"}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="text-sm text-neutral-500 flex items-center gap-1">
                      <Mail className="h-3.5 w-3.5" /> {user.email}
                    </p>
                  </div>
                </div>
                <Separator className="my-6" />
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-sm text-neutral-600">
                    Davam etmək istədiyinizə əminsiniz?
                  </p>
                  <Button
                    onClick={handleSignOut}
                    variant="destructive"
                    className="rounded-2xl px-6"
                  >
                    Çıxış et
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </motion.div>
  );
}

// --- Helpers ---
function OrderCard({ order }) {
  return (
    <Card className="rounded-2xl overflow-hidden">
      <div className="aspect-[16/6] sm:aspect-[16/5] w-full overflow-hidden bg-neutral-100">
        <img
          src={order.image}
          alt={order.title}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
      <CardContent className="pt-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h3 className="font-medium leading-tight">{order.title}</h3>
            <p className="text-sm text-neutral-500">
              Sifariş № {order.orderNo} • {formatDate(order.date)}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge
              className="rounded-xl"
              variant={order.status === "Tamamlandı" ? "secondary" : "default"}
            >
              {order.status}
            </Badge>
            <p className="text-sm font-medium">${formatPrice(order.price)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function EmptyState({ title, subtitle }) {
  return (
    <div className="rounded-2xl border border-dashed p-8 text-center">
      <p className="text-base font-medium">{title}</p>
      <p className="text-sm text-neutral-500 mt-1">{subtitle}</p>
    </div>
  );
}

function formatPrice(n) {
  if (typeof n !== "number") return n;
  return n.toLocaleString("en-US");
}

function formatDate(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("az-AZ", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  } catch {
    return iso;
  }
}
