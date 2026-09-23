'use client';

import { useState, useEffect } from 'react';

interface SupportGroup {
  id: string;
  name: string;
  description: string;
  category: string;
  memberCount: number;
  maxMembers: number;
  meetingTime: string;
  nextMeeting: string;
  isPublic: boolean;
  tags: string[];
  moderator: string;
}

interface GroupMember {
  userId: string;
  username: string;
  joinedDate: string;
  isActive: boolean;
}

const defaultSupportGroups: SupportGroup[] = [
  {
    id: 'anxiety-support',
    name: 'Anxiety Support Circle',
    description: 'A safe space to share experiences and coping strategies for anxiety management.',
    category: 'Anxiety',
    memberCount: 23,
    maxMembers: 30,
    meetingTime: 'Martes 7:00 PM (GMT-3)',
    nextMeeting: '2025-09-30T22:00:00Z',
    isPublic: true,
    tags: ['anxiety', 'breathing', 'mindfulness'],
    moderator: 'Dr. Carmen Silva'
  },
  {
    id: 'depression-recovery',
    name: 'Camino hacia la Recuperación',
    description: 'Apoyo mutuo para quienes enfrentan depresión y buscan herramientas de recuperación.',
    category: 'Depression',
    memberCount: 18,
    maxMembers: 25,
    meetingTime: 'Jueves 6:30 PM (GMT-3)',
    nextMeeting: '2025-10-02T21:30:00Z',
    isPublic: true,
    tags: ['depression', 'recovery', 'support'],
    moderator: 'Psic. Roberto Mendez'
  },
  {
    id: 'stress-management',
    name: 'Manejo del Estrés Laboral',
    description: 'Técnicas y estrategias para manejar el estrés del trabajo y la vida diaria.',
    category: 'Stress',
    memberCount: 31,
    maxMembers: 35,
    meetingTime: 'Lunes 8:00 PM (GMT-3)',
    nextMeeting: '2025-09-29T23:00:00Z',
    isPublic: true,
    tags: ['stress', 'work-life', 'balance'],
    moderator: 'Coach Ana Torres'
  },
  {
    id: 'mindfulness-meditation',
    name: 'Mindfulness en Español',
    description: 'Practica de mindfulness y meditación guiada en español.',
    category: 'Mindfulness',
    memberCount: 42,
    maxMembers: 50,
    meetingTime: 'Miércoles 7:30 PM (GMT-3)',
    nextMeeting: '2025-10-01T22:30:00Z',
    isPublic: true,
    tags: ['mindfulness', 'meditation', 'español'],
    moderator: 'Maestra Lucia Vargas'
  },
  {
    id: 'young-adults',
    name: 'Jóvenes Adultos (18-30)',
    description: 'Espacio para jóvenes adultos que enfrentan desafíos de salud mental.',
    category: 'Age Group',
    memberCount: 15,
    maxMembers: 20,
    meetingTime: 'Sábados 4:00 PM (GMT-3)',
    nextMeeting: '2025-10-04T19:00:00Z',
    isPublic: true,
    tags: ['young-adults', 'peer-support', 'life-transitions'],
    moderator: 'Psic. Felipe Rodriguez'
  },
  {
    id: 'lgbti-support',
    name: 'Comunidad LGBTI+ Bienestar',
    description: 'Grupo de apoyo específico para la comunidad LGBTI+ enfocado en bienestar mental.',
    category: 'LGBTI+',
    memberCount: 12,
    maxMembers: 15,
    meetingTime: 'Viernes 7:00 PM (GMT-3)',
    nextMeeting: '2025-10-03T22:00:00Z',
    isPublic: true,
    tags: ['lgbti', 'safe-space', 'identity'],
    moderator: 'Psic. Alex Morales'
  }
];

export default function SupportGroups() {
  const [supportGroups, setSupportGroups] = useState<SupportGroup[]>([]);
  const [userMemberships, setUserMemberships] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showJoinModal, setShowJoinModal] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>('');
  const [hasUsername, setHasUsername] = useState<boolean>(false);

  const categories = ['all', 'Anxiety', 'Depression', 'Stress', 'Mindfulness', 'Age Group', 'LGBTI+'];

  useEffect(() => {
    // Load groups and memberships from localStorage
    const savedGroups = localStorage.getItem('supportGroups');
    const savedMemberships = localStorage.getItem('userMemberships');
    const savedUsername = localStorage.getItem('supportGroupUsername');

    if (savedGroups) {
      setSupportGroups(JSON.parse(savedGroups));
    } else {
      setSupportGroups(defaultSupportGroups);
      localStorage.setItem('supportGroups', JSON.stringify(defaultSupportGroups));
    }

    if (savedMemberships) {
      setUserMemberships(JSON.parse(savedMemberships));
    }

    if (savedUsername) {
      setUserName(savedUsername);
      setHasUsername(true);
    }
  }, []);

  const saveUsername = () => {
    if (userName.trim()) {
      localStorage.setItem('supportGroupUsername', userName.trim());
      setHasUsername(true);
    }
  };

  const joinGroup = (groupId: string) => {
    if (!hasUsername) {
      setShowJoinModal(groupId);
      return;
    }

    const updatedMemberships = [...userMemberships, groupId];
    const updatedGroups = supportGroups.map(group =>
      group.id === groupId
        ? { ...group, memberCount: group.memberCount + 1 }
        : group
    );

    setUserMemberships(updatedMemberships);
    setSupportGroups(updatedGroups);

    localStorage.setItem('userMemberships', JSON.stringify(updatedMemberships));
    localStorage.setItem('supportGroups', JSON.stringify(updatedGroups));
  };

  const leaveGroup = (groupId: string) => {
    const updatedMemberships = userMemberships.filter(id => id !== groupId);
    const updatedGroups = supportGroups.map(group =>
      group.id === groupId
        ? { ...group, memberCount: Math.max(0, group.memberCount - 1) }
        : group
    );

    setUserMemberships(updatedMemberships);
    setSupportGroups(updatedGroups);

    localStorage.setItem('userMemberships', JSON.stringify(updatedMemberships));
    localStorage.setItem('supportGroups', JSON.stringify(updatedGroups));
  };

  const handleJoinWithUsername = () => {
    if (userName.trim()) {
      saveUsername();
      if (showJoinModal) {
        joinGroup(showJoinModal);
      }
      setShowJoinModal(null);
    }
  };

  const formatNextMeeting = (meetingDate: string) => {
    const date = new Date(meetingDate);
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Hoy';
    if (diffDays === 1) return 'Mañana';
    if (diffDays < 7) return `En ${diffDays} días`;
    return date.toLocaleDateString('es-ES', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Anxiety': return '😰';
      case 'Depression': return '💙';
      case 'Stress': return '⚡';
      case 'Mindfulness': return '🧘';
      case 'Age Group': return '👥';
      case 'LGBTI+': return '🏳️‍🌈';
      default: return '💬';
    }
  };

  const filteredGroups = selectedCategory === 'all'
    ? supportGroups
    : supportGroups.filter(group => group.category === selectedCategory);

  return (
    <div className="card-clean rounded-xl p-6 max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold gradient-text-primary mb-2">
          🤝 Grupos de Apoyo
        </h3>
        <p className="text-secondary-custom">
          Conecta con personas que entienden tu experiencia. Únete a grupos de apoyo seguros y moderados.
        </p>
        {hasUsername && (
          <p className="text-emerald-600 text-sm mt-2">
            ¡Hola, {userName}! 👋 Estás conectado/a para unirte a grupos.
          </p>
        )}
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              selectedCategory === category
                ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md'
                : 'bg-gradient-to-r from-slate-100 to-gray-100 text-slate-600 hover:from-slate-200 hover:to-gray-200'
            }`}
          >
            {category === 'all' ? 'Todos' : `${getCategoryIcon(category)} ${category}`}
          </button>
        ))}
      </div>

      {/* My Groups Section */}
      {userMemberships.length > 0 && (
        <div className="mb-8">
          <h4 className="text-lg font-semibold text-primary-custom mb-4">Mis Grupos</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {supportGroups
              .filter(group => userMemberships.includes(group.id))
              .map((group) => (
                <div key={group.id} className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <h5 className="font-semibold text-emerald-800">{group.name}</h5>
                    <span className="text-lg">{getCategoryIcon(group.category)}</span>
                  </div>
                  <p className="text-emerald-600 text-sm mb-3">
                    Próxima reunión: {formatNextMeeting(group.nextMeeting)}
                  </p>
                  <p className="text-emerald-600 text-sm mb-3">{group.meetingTime}</p>
                  <button
                    onClick={() => leaveGroup(group.id)}
                    className="text-xs text-red-600 hover:text-red-800 underline"
                  >
                    Salir del grupo
                  </button>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Available Groups */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGroups.map((group) => {
          const isMember = userMemberships.includes(group.id);
          const isFull = group.memberCount >= group.maxMembers;

          return (
            <div key={group.id} className="bg-gradient-to-br from-white to-slate-50 border border-slate-200 rounded-lg p-6 hover:shadow-lg hover:shadow-slate-200 transition-all duration-200">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="font-semibold text-primary-custom mb-1">{group.name}</h4>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{getCategoryIcon(group.category)}</span>
                    <span className="text-xs bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 px-2 py-1 rounded">
                      {group.category}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-secondary-custom text-sm mb-4">{group.description}</p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Miembros:</span>
                  <span className="font-medium">{group.memberCount}/{group.maxMembers}</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400"
                    style={{ width: `${(group.memberCount / group.maxMembers) * 100}%` }}
                  ></div>
                </div>
                <div className="text-sm text-slate-600">
                  <p><strong>Horario:</strong> {group.meetingTime}</p>
                  <p><strong>Próxima reunión:</strong> {formatNextMeeting(group.nextMeeting)}</p>
                  <p><strong>Moderador:</strong> {group.moderator}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mb-4">
                {group.tags.map((tag) => (
                  <span key={tag} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">
                    #{tag}
                  </span>
                ))}
              </div>

              {isMember ? (
                <div className="text-center">
                  <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg p-3 mb-2">
                    <span className="text-emerald-700 font-medium text-sm">✅ Ya eres miembro</span>
                  </div>
                  <button
                    onClick={() => leaveGroup(group.id)}
                    className="text-sm text-red-600 hover:text-red-800 underline"
                  >
                    Salir del grupo
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => joinGroup(group.id)}
                  disabled={isFull}
                  className={`w-full py-2 px-4 rounded-lg font-medium text-sm transition-all duration-200 ${
                    isFull
                      ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 shadow-md hover:shadow-lg'
                  }`}
                >
                  {isFull ? 'Grupo lleno' : 'Unirse al grupo'}
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Join Modal */}
      {showJoinModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h4 className="text-xl font-semibold text-primary-custom mb-4">
              Unirse al Grupo de Apoyo
            </h4>
            <p className="text-secondary-custom mb-4">
              Para unirte a los grupos de apoyo, necesitamos un nombre de usuario que te represente.
              Puede ser tu nombre real o un pseudónimo.
            </p>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre de usuario:
              </label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Ej: Maria, Alex, Usuario123..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                maxLength={20}
              />
            </div>
            <div className="flex space-x-3">
              <button
                onClick={handleJoinWithUsername}
                disabled={!userName.trim()}
                className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-2 px-4 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Unirse
              </button>
              <button
                onClick={() => setShowJoinModal(null)}
                className="flex-1 bg-slate-200 text-slate-700 py-2 px-4 rounded-lg font-medium hover:bg-slate-300"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Info Section */}
      <div className="mt-8 p-4 bg-gradient-to-r from-sky-50 to-blue-50 border border-sky-200 rounded-lg">
        <div className="flex items-center space-x-2 text-sky-800 mb-2">
          <span>💡</span>
          <span className="font-semibold">Información importante:</span>
        </div>
        <ul className="text-sky-700 text-sm space-y-1">
          <li>• Los grupos son moderados por profesionales de salud mental</li>
          <li>• Mantén la confidencialidad y respeta a otros miembros</li>
          <li>• Si necesitas ayuda inmediata, contacta los servicios de crisis</li>
          <li>• Los grupos son gratuitos y se reúnen semanalmente por video llamada</li>
        </ul>
      </div>
    </div>
  );
}