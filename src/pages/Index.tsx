import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';

interface Profile {
  id: number;
  name: string;
  age: number;
  location: string;
  bio: string;
  interests: string[];
  image: string;
  online: boolean;
}

interface Message {
  id: number;
  senderId: number;
  text: string;
  timestamp: Date;
}

interface Match {
  profile: Profile;
  messages: Message[];
}

const mockProfiles: Profile[] = [
  {
    id: 1,
    name: 'Анна',
    age: 25,
    location: 'Москва',
    bio: 'Люблю путешествия, кофе и хорошие книги',
    interests: ['Путешествия', 'Фотография', 'Йога'],
    image: 'https://cdn.poehali.dev/projects/bd394a23-199e-4d0c-a457-b4cd72d3881f/files/a7042506-bcbc-4f76-aa28-4b11d9355cd5.jpg',
    online: true,
  },
  {
    id: 2,
    name: 'Максим',
    age: 28,
    location: 'Санкт-Петербург',
    bio: 'IT-специалист, обожаю активный отдых',
    interests: ['Спорт', 'Технологии', 'Кино'],
    image: 'https://cdn.poehali.dev/projects/bd394a23-199e-4d0c-a457-b4cd72d3881f/files/f311ae32-fb5d-4bb8-acba-40ea78fc38b3.jpg',
    online: false,
  },
  {
    id: 3,
    name: 'Елена',
    age: 27,
    location: 'Москва',
    bio: 'Дизайнер, ценю креативность и искусство',
    interests: ['Дизайн', 'Искусство', 'Музыка'],
    image: 'https://cdn.poehali.dev/projects/bd394a23-199e-4d0c-a457-b4cd72d3881f/files/1e3f50e6-e1f2-41e3-91bc-7050aeb7e82e.jpg',
    online: true,
  },
];

const Index = () => {
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [matches, setMatches] = useState<Match[]>([]);
  const [isMatchesOpen, setIsMatchesOpen] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messageInput, setMessageInput] = useState('');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [language, setLanguage] = useState('RU');
  const [isVipDialogOpen, setIsVipDialogOpen] = useState(false);

  const currentProfile = mockProfiles[currentProfileIndex];

  const handleLike = () => {
    const newMatch: Match = {
      profile: currentProfile,
      messages: [],
    };
    setMatches([...matches, newMatch]);
    nextProfile();
  };

  const handlePass = () => {
    nextProfile();
  };

  const nextProfile = () => {
    if (currentProfileIndex < mockProfiles.length - 1) {
      setCurrentProfileIndex(currentProfileIndex + 1);
    } else {
      setCurrentProfileIndex(0);
    }
  };

  const sendMessage = () => {
    if (!selectedMatch || !messageInput.trim()) return;

    const newMessage: Message = {
      id: Date.now(),
      senderId: 0,
      text: messageInput,
      timestamp: new Date(),
    };

    const updatedMatches = matches.map((match) =>
      match.profile.id === selectedMatch.profile.id
        ? { ...match, messages: [...match.messages, newMessage] }
        : match
    );

    setMatches(updatedMatches);
    setSelectedMatch({
      ...selectedMatch,
      messages: [...selectedMatch.messages, newMessage],
    });
    setMessageInput('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dating-pink/10 via-dating-purple/10 to-dating-orange/10">
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="text-3xl font-bold bg-gradient-to-r from-dating-pink via-dating-purple to-dating-orange bg-clip-text text-transparent">
              #DATING
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <Button
              variant="ghost"
              onClick={() => setIsMatchesOpen(true)}
              className="relative hover:text-dating-pink transition-colors"
            >
              <Icon name="Heart" className="mr-2" size={20} />
              Совпадения
              {matches.length > 0 && (
                <Badge className="absolute -top-1 -right-1 bg-dating-pink text-white border-0 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  {matches.length}
                </Badge>
              )}
            </Button>
            <Button
              variant="ghost"
              onClick={() => setIsProfileOpen(true)}
              className="hover:text-dating-purple transition-colors"
            >
              <Icon name="User" className="mr-2" size={20} />
              Профиль
            </Button>
          </nav>

          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLanguage(language === 'RU' ? 'EN' : 'RU')}
              className="hidden sm:flex border-dating-pink text-dating-pink hover:bg-dating-pink hover:text-white transition-all"
            >
              {language}
            </Button>
            <Button
              className="bg-gradient-to-r from-dating-pink to-dating-orange text-white border-0 hover:shadow-lg hover:scale-105 transition-all"
              size="sm"
            >
              <Icon name="Crown" className="mr-2" size={18} />
              VIP
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card className="overflow-hidden border-0 shadow-2xl animate-scale-in">
              <div className="relative aspect-[3/4] group">
                <img
                  src={currentProfile.image}
                  alt={currentProfile.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                
                {currentProfile.online && (
                  <Badge className="absolute top-4 right-4 bg-green-500 text-white border-0 shadow-lg animate-fade-in">
                    <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse" />
                    Online
                  </Badge>
                )}

                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h2 className="text-4xl font-bold mb-2">
                    {currentProfile.name}, {currentProfile.age}
                  </h2>
                  <div className="flex items-center gap-2 mb-3">
                    <Icon name="MapPin" size={18} />
                    <span className="text-lg">{currentProfile.location}</span>
                  </div>
                  <p className="text-white/90 mb-4 text-lg">{currentProfile.bio}</p>
                  <div className="flex flex-wrap gap-2">
                    {currentProfile.interests.map((interest) => (
                      <Badge
                        key={interest}
                        variant="secondary"
                        className="bg-white/20 backdrop-blur-sm text-white border-0 hover:bg-white/30 transition-all"
                      >
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-r from-white to-gray-50 flex justify-center gap-6">
                <Button
                  size="lg"
                  variant="outline"
                  onClick={handlePass}
                  className="w-16 h-16 rounded-full border-2 border-gray-300 hover:border-gray-400 hover:scale-110 transition-all shadow-lg"
                >
                  <Icon name="X" size={28} className="text-gray-600" />
                </Button>
                <Button
                  size="lg"
                  onClick={handleLike}
                  className="w-16 h-16 rounded-full backdrop-blur-md bg-white/30 text-red-500 border-0 hover:shadow-2xl hover:scale-110 hover:bg-white/40 transition-all animate-pulse"
                >
                  <Icon name="Heart" size={28} className="fill-red-500" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => setIsVipDialogOpen(true)}
                  className="w-16 h-16 rounded-full border-2 border-dating-purple text-dating-purple hover:bg-dating-purple hover:text-white hover:scale-110 transition-all shadow-lg"
                >
                  <Icon name="MessageCircle" size={28} />
                </Button>
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-6 bg-gradient-to-br from-dating-pink to-dating-purple text-white border-0 shadow-xl animate-fade-in">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Icon name="Sparkles" size={24} />
                Подсказки
              </h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <Icon name="Check" size={18} className="mt-0.5 flex-shrink-0" />
                  <span>Добавьте больше фото в профиль</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" size={18} className="mt-0.5 flex-shrink-0" />
                  <span>Заполните раздел интересов</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" size={18} className="mt-0.5 flex-shrink-0" />
                  <span>Будьте активны - пишите первыми!</span>
                </li>
              </ul>
            </Card>

            <Card className="p-6 border-0 shadow-xl animate-fade-in">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Icon name="TrendingUp" size={24} className="text-dating-pink" />
                Статистика
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Просмотры профиля</span>
                    <span className="font-bold text-dating-pink">127</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-dating-pink to-dating-purple w-3/4 rounded-full" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Совпадения</span>
                    <span className="font-bold text-dating-purple">{matches.length}</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-dating-purple to-dating-orange w-1/2 rounded-full" />
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>

      <Sheet open={isMatchesOpen} onOpenChange={setIsMatchesOpen}>
        <SheetContent side="right" className="w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle className="text-2xl font-bold bg-gradient-to-r from-dating-pink to-dating-purple bg-clip-text text-transparent">
              Ваши совпадения
            </SheetTitle>
          </SheetHeader>
          <ScrollArea className="h-[calc(100vh-100px)] mt-6">
            {matches.length === 0 ? (
              <div className="text-center py-12">
                <Icon name="Heart" size={64} className="mx-auto text-gray-300 mb-4" />
                <p className="text-muted-foreground">Пока нет совпадений</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Продолжайте листать анкеты!
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {matches.map((match) => (
                  <Card
                    key={match.profile.id}
                    className="p-4 cursor-pointer hover:shadow-lg transition-all hover:scale-[1.02] border-0 bg-gradient-to-r from-white to-gray-50"
                    onClick={() => {
                      setSelectedMatch(match);
                      setIsChatOpen(true);
                      setIsMatchesOpen(false);
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <Avatar className="h-16 w-16 ring-2 ring-dating-pink">
                        <AvatarImage src={match.profile.image} alt={match.profile.name} />
                        <AvatarFallback>{match.profile.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-lg">{match.profile.name}</h4>
                          {match.profile.online && (
                            <div className="w-3 h-3 bg-green-500 rounded-full" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{match.profile.location}</p>
                        {match.messages.length > 0 && (
                          <p className="text-sm text-muted-foreground mt-1 truncate">
                            {match.messages[match.messages.length - 1].text}
                          </p>
                        )}
                      </div>
                      <Icon name="MessageCircle" className="text-dating-pink" size={24} />
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </ScrollArea>
        </SheetContent>
      </Sheet>

      <Dialog open={isChatOpen} onOpenChange={setIsChatOpen}>
        <DialogContent className="sm:max-w-2xl h-[600px] flex flex-col p-0">
          {selectedMatch && (
            <>
              <DialogHeader className="p-6 pb-4 border-b">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12 ring-2 ring-dating-pink">
                    <AvatarImage src={selectedMatch.profile.image} alt={selectedMatch.profile.name} />
                    <AvatarFallback>{selectedMatch.profile.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <DialogTitle className="text-xl">{selectedMatch.profile.name}</DialogTitle>
                    <p className="text-sm text-muted-foreground">
                      {selectedMatch.profile.online ? 'В сети' : 'Не в сети'}
                    </p>
                  </div>
                </div>
              </DialogHeader>

              <ScrollArea className="flex-1 p-6">
                {selectedMatch.messages.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-dating-pink to-dating-purple rounded-full flex items-center justify-center">
                      <Icon name="MessageCircle" size={40} className="text-white" />
                    </div>
                    <p className="text-muted-foreground">Начните общение!</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Напишите первое сообщение {selectedMatch.profile.name}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {selectedMatch.messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.senderId === 0 ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                            message.senderId === 0
                              ? 'bg-gradient-to-r from-dating-pink to-dating-purple text-white'
                              : 'bg-gray-100 text-gray-900'
                          }`}
                        >
                          <p>{message.text}</p>
                          <p className="text-xs mt-1 opacity-70">
                            {message.timestamp.toLocaleTimeString('ru-RU', {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>

              <div className="p-4 border-t bg-gray-50">
                <div className="flex gap-2">
                  <Input
                    placeholder="Напишите сообщение..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    className="flex-1 border-gray-300 focus:ring-dating-pink focus:border-dating-pink"
                  />
                  <Button
                    onClick={sendMessage}
                    className="bg-gradient-to-r from-dating-pink to-dating-purple text-white border-0 hover:shadow-lg transition-all"
                  >
                    <Icon name="Send" size={20} />
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-dating-pink to-dating-purple bg-clip-text text-transparent">
              Моя анкета
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="flex flex-col items-center gap-4">
              <Avatar className="h-32 w-32 ring-4 ring-dating-pink">
                <AvatarImage src="https://cdn.poehali.dev/projects/bd394a23-199e-4d0c-a457-b4cd72d3881f/files/a7042506-bcbc-4f76-aa28-4b11d9355cd5.jpg" />
                <AvatarFallback>Я</AvatarFallback>
              </Avatar>
              <Button
                variant="outline"
                className="border-dating-pink text-dating-pink hover:bg-dating-pink hover:text-white transition-all"
              >
                <Icon name="Camera" className="mr-2" size={18} />
                Изменить фото
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Имя</label>
                <Input placeholder="Ваше имя" />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">О себе</label>
                <Input placeholder="Расскажите о себе" />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Интересы</label>
                <div className="flex flex-wrap gap-2">
                  {['Путешествия', 'Спорт', 'Музыка', 'Кино'].map((interest) => (
                    <Badge
                      key={interest}
                      className="bg-gradient-to-r from-dating-pink/20 to-dating-purple/20 text-dating-pink border-dating-pink cursor-pointer hover:from-dating-pink hover:to-dating-purple hover:text-white transition-all"
                    >
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <Button className="w-full bg-gradient-to-r from-dating-pink to-dating-purple text-white border-0 hover:shadow-lg transition-all">
              Сохранить изменения
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isVipDialogOpen} onOpenChange={setIsVipDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-dating-pink to-dating-orange bg-clip-text text-transparent flex items-center gap-2">
              <Icon name="Crown" size={28} className="text-dating-orange" />
              Подписка VIP
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="text-center py-6">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-dating-pink to-dating-orange rounded-full flex items-center justify-center">
                <Icon name="Lock" size={48} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Чтобы писать сообщения</h3>
              <p className="text-muted-foreground mb-6">
                Оформите VIP-подписку и получите неограниченный доступ к чату
              </p>
            </div>

            <ScrollArea className="max-h-[400px] pr-4">
              <div className="space-y-3">
                <Card className="p-4 border-2 border-dating-pink/50 hover:border-dating-pink bg-gradient-to-r from-white to-gray-50 cursor-pointer hover:shadow-lg transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold">1 месяц</h4>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-dating-pink">499₽</span>
                  </div>
                </Card>

                <Card className="p-4 border-2 border-dating-purple bg-gradient-to-r from-dating-purple/5 to-dating-pink/5 cursor-pointer hover:shadow-lg transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold">3 месяца</h4>
                    <Badge className="bg-dating-purple text-white border-0">Выгодно</Badge>
                  </div>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-2xl font-bold text-dating-purple">999₽</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Разовый платёж • ~333₽/мес</p>
                </Card>

                <Card className="p-4 border-2 border-dating-orange bg-gradient-to-r from-dating-orange/5 to-dating-pink/5 cursor-pointer hover:shadow-lg transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold">1 год</h4>
                    <Badge className="bg-dating-orange text-white border-0">-67%</Badge>
                  </div>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-2xl font-bold text-dating-orange">1999₽</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Разовый платёж • ~166₽/мес</p>
                </Card>

                <Card className="p-4 border-2 border-dating-pink bg-gradient-to-r from-dating-pink to-dating-purple cursor-pointer hover:shadow-2xl transition-all relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-400/20 rounded-full -mr-10 -mt-10" />
                  <div className="flex items-center justify-between mb-2 relative z-10">
                    <h4 className="font-bold text-white">Навсегда</h4>
                    <Badge className="bg-yellow-400 text-black border-0 font-bold">
                      <Icon name="Sparkles" size={12} className="mr-1" />
                      ХИТ
                    </Badge>
                  </div>
                  <div className="flex items-baseline gap-2 mb-1 relative z-10">
                    <span className="text-2xl font-bold text-white">3999₽</span>
                  </div>
                  <p className="text-xs text-white/90 relative z-10">Один раз и навсегда</p>
                </Card>

                <ul className="space-y-2 text-sm pt-3 border-t">
                  <li className="flex items-center gap-2">
                    <Icon name="Check" size={16} className="text-dating-pink" />
                    <span>Неограниченные сообщения</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="Check" size={16} className="text-dating-pink" />
                    <span>Просмотр лайков</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="Check" size={16} className="text-dating-pink" />
                    <span>Без рекламы</span>
                  </li>
                </ul>
              </div>
            </ScrollArea>

            <div className="space-y-3 pt-4 border-t">
              <Button className="w-full bg-gradient-to-r from-dating-pink to-dating-orange text-white border-0 hover:shadow-xl transition-all py-6 text-lg">
                <Icon name="Crown" className="mr-2" size={20} />
                Оформить VIP
              </Button>

              <Button
                variant="ghost"
                onClick={() => setIsVipDialogOpen(false)}
                className="w-full text-muted-foreground hover:text-foreground"
              >
                Может позже
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;